
import mongoose from "mongoose";

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

const paymentSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      required: true 
    },
    paypalOrderId: {
      type: String,
      required: true,
      unique: true
    },
    paypalCaptureId: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: 'USD'
    },
    description: {
      type: String,
      default: ''
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

// Index for faster queries
paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ paypalOrderId: 1 }, { unique: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
