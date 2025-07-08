
import Payment from '../models/Payment.model';
import { Request, Response } from 'express';

export const createPayments = async (req: Request, res: Response): Promise<void> => {
  const { userId, amount, status } = req.body;

  if (!userId || !amount || !status) {
    res.status(400).json({ message: 'Please provide user ID, amount, and status' });
    return;
  }

  try {
    const newPayment = new Payment({ userId, amount, status });
    await newPayment.save();

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: newPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
