import { Response } from 'express';
import Payment, { PaymentStatus } from '../models/Payment.model';
import { createOrder, capturePayment } from '../config/paypal';
import { AuthenticatedRequest } from '../types/express';
import SocketService from '../services/socket.service';

// @desc    Create a new payment order
// @route   POST /api/payments/create-order
// @access  Private
export const createPaymentOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = req.user?._id;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Create order in PayPal
    const order = await createOrder(amount);

    // Save payment record in database
    const payment = new Payment({
      userId,
      amount,
      status: PaymentStatus.PENDING,
      paypalOrderId: order.id,
      currency: 'USD',
      description: `Payment of $${amount}`,
      metadata: {
        source: 'paypal',
        orderDetails: order
      }
    });
    
    const savedPayment = await payment.save();
    
    // Emit new payment event to admin dashboard
    SocketService.getInstance()?.emitNewPayment(savedPayment);

    res.status(201).json({
      id: order.id,
      status: order.status,
      links: order.links,
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ message: 'Error creating payment order' });
  }
};

// @desc    Capture payment
// @route   POST /api/payments/capture/:orderId
// @access  Private
export const captureOrderPayment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?._id;

    // Find the payment record
    const payment = await Payment.findOne({ paypalOrderId: orderId, userId });
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Capture payment in PayPal
    const capture = await capturePayment(orderId);

    // Emit payment update to admin dashboard
    if (capture.status === 'COMPLETED') {
      const updatedPayment = await Payment.findOneAndUpdate(
        { paypalOrderId: orderId },
        { 
          status: PaymentStatus.COMPLETED,
          paypalCaptureId: capture.purchase_units[0].payments.captures[0].id,
          'metadata.captureDetails': capture
        },
        { new: true }
      );
      
      if (updatedPayment) {
        SocketService.getInstance()?.emitPaymentUpdate(updatedPayment);
      }
    }

    // Update payment record
    payment.status = capture.status === 'COMPLETED' ? PaymentStatus.COMPLETED : PaymentStatus.FAILED;
    payment.paypalCaptureId = capture.purchase_units[0].payments.captures[0].id;
    const updatedMetadata = {
      ...(payment.metadata || {}),
      captureDetails: capture,
      updatedAt: new Date().toISOString()
    };
    payment.metadata = updatedMetadata;
    
    await payment.save();

    res.status(200).json({
      status: payment.status,
      paymentId: payment._id,
      captureId: payment.paypalCaptureId,
    });
  } catch (error) {
    console.error('Error capturing payment:', error);
    res.status(500).json({ message: 'Error capturing payment' });
  }
};

// @desc    Get payment details
// @route   GET /api/payments/:id
// @access  Private
export const getPaymentDetails = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const payment = await Payment.findOne({ _id: id, userId });
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ message: 'Error fetching payment details' });
  }
};
