import { Router, RequestHandler } from 'express';
import { auth, admin } from '../middleware/auth';
import * as adminPaymentController from '../controllers/admin/payment.controller';
import { AuthenticatedRequest } from '../types/express';

const router = Router();

// Type guard for authenticated requests
const isAuthenticated = (req: any): req is AuthenticatedRequest => {
  return req.user !== undefined;
};

// Apply auth and admin middleware to all routes
router.use(auth);
router.use(admin);

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

export default router;
