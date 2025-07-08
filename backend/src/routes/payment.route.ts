import express from 'express';
import { createPayments } from '../controllers/paymentController'; 
import { errorHandler } from '../middleware/errorHandler';

const router = express.Router();

router.post('/', createPayments);

// Global Error Handler (last)
router.use(errorHandler);

export default router;
