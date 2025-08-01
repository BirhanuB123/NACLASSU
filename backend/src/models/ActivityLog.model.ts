import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  action: string;
  user: {
    _id: string;
    email: string;
    role: string;
  };
  details?: any;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
  action: { type: String, required: true },
  user: {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
  },
  details: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema); 