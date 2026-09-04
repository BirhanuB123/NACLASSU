import { Router, RequestHandler } from 'express';
import { auth, admin } from '../middleware/auth';
import * as adminPaymentController from '../controllers/admin/payment.controller';
import { getActivityLogs } from '../controllers/admin/activity.controller';
import * as dashboardController from '../controllers/admin/dashboard.controller';
import { AuthenticatedRequest } from '../types/express';

const router = Router();

// Type guard for authenticated requests
const isAuthenticated = (req: any): req is AuthenticatedRequest => {
  return req.user !== undefined;
};

// Apply auth and admin middleware to all routes
router.use(auth);
router.use(admin);

// Test endpoint to verify admin routes are accessible (protected)
router.get('/test', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  res.json({ 
    message: 'Admin routes are working!', 
    timestamp: new Date().toISOString(),
    user: {
      email: authReq.user?.email,
      role: authReq.user?.role
    }
  });
});

// Dashboard routes
router.get('/dashboard/stats', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (dashboardController.getDashboardStats as any)(req, res, next);
});

router.get('/dashboard/users', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (dashboardController.getRecentUsers as any)(req, res, next);
});

router.get('/dashboard/donations', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (dashboardController.getRecentDonations as any)(req, res, next);
});

router.get('/dashboard/activities', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (dashboardController.getRecentActivities as any)(req, res, next);
});

router.get('/dashboard/user-growth', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (dashboardController.getUserGrowthData as any)(req, res, next);
});

router.get('/dashboard/donation-trends', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (dashboardController.getDonationTrendsData as any)(req, res, next);
});

// Payment routes
router.get('/payments', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (adminPaymentController.getAllPayments as any)(req, res, next);
});

router.get('/payments/stats', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (adminPaymentController.getPaymentStats as any)(req, res, next);
});

router.get('/payments/:id', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (adminPaymentController.getPaymentById as any)(req, res, next);
});

router.put('/payments/:id/status', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (adminPaymentController.updatePaymentStatus as any)(req, res, next);
});

// Add activity logs endpoint
router.get('/activities', (req, res, next) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return (getActivityLogs as any)(req, res, next);
});

// Get all users (admin only)
router.get('/users', (async (req: any, res: any, next: any) => {
  try {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const User = (await import('../models/User.model')).default;
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}) as any);

export default router;
