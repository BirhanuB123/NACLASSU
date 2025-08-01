import { Request, Response, NextFunction } from 'express';
import ActivityLog from '../../models/ActivityLog.model';
import { AuthenticatedRequest } from '../../types/express';

// Log an activity (to be called from other controllers)
export const logActivity = async (action: string, user: any, details?: any) => {
  try {
    await ActivityLog.create({ action, user, details });
  } catch (error) {
    // Optionally log to console or external service
    console.error('Failed to log activity:', error);
  }
};

// Get paginated activity logs (admin only)
export const getActivityLogs = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const total = await ActivityLog.countDocuments();
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: logs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    next(error);
  }
}; 