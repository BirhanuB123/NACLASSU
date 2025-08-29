import { Request, Response, NextFunction } from 'express';
import User from '../../models/User.model';
import Payment from '../../models/Payment.model';
import ActivityLog from '../../models/ActivityLog.model';
import { AuthenticatedRequest } from '../../types/express';

// Get dashboard statistics
export const getDashboardStats = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get current date for monthly calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get user statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ 
      lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Active in last 30 days
    });

    // Get payment statistics
    const totalDonations = await Payment.aggregate([
      { $match: { status: 'COMPLETED' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const pendingDonations = await Payment.countDocuments({ status: 'PENDING' });

    // Get monthly donations
    const monthlyDonations = await Payment.aggregate([
      { 
        $match: { 
          status: 'COMPLETED',
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Get recent activity count
    const recentActivities = await ActivityLog.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    });

    // Calculate monthly goal (you can make this configurable)
    const monthlyGoal = 10000; // $10,000 default goal
    const currentMonthTotal = monthlyDonations[0]?.total || 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        totalDonations: totalDonations[0]?.total || 0,
        pendingDonations,
        monthlyGoal,
        currentMonthDonations: currentMonthTotal,
        recentActivities
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    next(error);
  }
};

// Get recent users
export const getRecentUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    
    const users = await User.find()
      .select('fullName email role lastLogin createdAt')
      .sort({ createdAt: -1 })
      .limit(limit);

    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      status: user.lastLogin && user.lastLogin > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 'active' : 'inactive',
      lastActive: user.lastLogin || user.createdAt
    }));

    res.json({
      success: true,
      data: formattedUsers
    });
  } catch (error) {
    console.error('Error fetching recent users:', error);
    next(error);
  }
};

// Get recent donations
export const getRecentDonations = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    
    const donations = await Payment.find()
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit);

    const formattedDonations = donations.map(donation => ({
      id: donation._id,
      amount: donation.amount,
      donor: donation.userId ? (donation.userId as any).fullName : 'Anonymous',
      email: donation.userId ? (donation.userId as any).email : '',
      date: donation.createdAt,
      status: donation.status,
      description: donation.description
    }));

    res.json({
      success: true,
      data: formattedDonations
    });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    next(error);
  }
};

// Get recent activities
export const getRecentActivities = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    
    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    next(error);
  }
};

// Get user growth data for charts
export const getUserGrowthData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    res.json({
      success: true,
      data: userGrowth
    });
  } catch (error) {
    console.error('Error fetching user growth data:', error);
    next(error);
  }
};

// Get donation trends data for charts
export const getDonationTrendsData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const donationTrends = await Payment.aggregate([
      {
        $match: {
          status: 'COMPLETED',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    res.json({
      success: true,
      data: donationTrends
    });
  } catch (error) {
    console.error('Error fetching donation trends data:', error);
    next(error);
  }
};
