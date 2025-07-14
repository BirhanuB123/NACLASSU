import { Router, RequestHandler, Response, NextFunction } from 'express';
import { auth } from '../middleware/auth';
import {
  createPaymentOrder,
  captureOrderPayment,
  getPaymentDetails,
} from '../controllers/payment.controller';
import { AuthenticatedRequest } from '../types/express';

const router = Router();

// Type guard to check if request is authenticated
const isAuthenticatedRequest = (req: any): req is AuthenticatedRequest => {
  return req.user !== undefined;
};

// Create a new payment order
router.post('/create-order', auth, (async (req, res, next) => {
  try {
    if (!isAuthenticatedRequest(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await createPaymentOrder(req, res);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Capture payment for an order
router.post('/capture-order/:orderId', auth, (async (req, res, next) => {
  try {
    if (!isAuthenticatedRequest(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await captureOrderPayment(req, res);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Get payment details
router.get('/:paymentId', auth, (async (req, res, next) => {
  try {
    if (!isAuthenticatedRequest(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await getPaymentDetails(req, res);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
