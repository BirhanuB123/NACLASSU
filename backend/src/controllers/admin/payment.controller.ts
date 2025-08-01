import { Response, NextFunction } from 'express';
import Payment, { PaymentStatus } from '../../models/Payment.model';
import { AuthenticatedRequest } from '../../types/express';
import { logActivity } from './activity.controller';

// @desc    Get all payments (with filtering and pagination)
// @route   GET /api/admin/payments
// @access  Private/Admin
export const getAllPayments = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter: any = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }
    
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate as string);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate as string);
      }
    }
    
    // Get total count for pagination
    const total = await Payment.countDocuments(filter);
    
    // Get paginated payments
    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');
    
    res.json({
      success: true,
      data: payments,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
    
  } catch (error) {
    console.error('Error fetching payments:', error);
    next(error);
  }
};

// @desc    Get payment statistics
// @route   GET /api/admin/payments/stats
// @access  Private/Admin
export const getPaymentStats = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await Payment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          count: 1,
          totalAmount: 1
        }
      }
    ]);
    
    // Calculate total revenue
    const revenue = await Payment.aggregate([
      { $match: { status: PaymentStatus.COMPLETED } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get today's revenue
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayRevenue = await Payment.aggregate([
      { 
        $match: { 
          status: PaymentStatus.COMPLETED,
          createdAt: { $gte: today }
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    res.json({
      success: true,
      data: {
        stats,
        totalRevenue: revenue[0]?.total || 0,
        todayRevenue: todayRevenue[0]?.total || 0,
        totalPayments: await Payment.countDocuments()
      }
    });
    
  } catch (error) {
    console.error('Error fetching payment stats:', error);
    next(error);
  }
};

// @desc    Update payment status
// @route   PUT /api/admin/payments/:id/status
// @access  Private/Admin
export const updatePaymentStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    
    if (!Object.values(PaymentStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    
    res.json({
      success: true,
      data: payment
    });
    await logActivity('update_payment_status', req.user, { paymentId: payment._id, newStatus: payment.status });
    
  } catch (error) {
    console.error('Error updating payment status:', error);
    next(error);
  }
};

// @desc    Get payment by ID
// @route   GET /api/admin/payments/:id
// @access  Private/Admin
export const getPaymentById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('userId', 'name email');
      
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    
    res.json({
      success: true,
      data: payment
    });
    
  } catch (error) {
    console.error('Error fetching payment:', error);
    next(error);
  }
};
