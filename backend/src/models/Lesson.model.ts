
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  content: string;
  date: Date;
  maxParticipants?: number;
  registrations: Array<{
    userId: Types.ObjectId;
    status: 'registered' | 'waitlisted' | 'cancelled';
    registeredAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['registered', 'waitlisted', 'cancelled'],
    default: 'registered',
    required: true 
  },
  registeredAt: { type: Date, default: Date.now }
});

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    maxParticipants: { type: Number, default: 20 },
    registrations: [registrationSchema]
  },
  {
    timestamps: true,
  }
);

// Add methods to handle registrations
lessonSchema.methods.registerUser = async function(userId: string) {
  const userObjectId = new Types.ObjectId(userId);
  
  // Check if user is already registered
  const existingRegistration = this.registrations.find(
    (r: any) => r.userId.equals(userObjectId) && r.status !== 'cancelled'
  );

  if (existingRegistration) {
    throw new Error('User is already registered for this lesson');
  }

  // Check if there's space available
  const registeredCount = this.registrations.filter(
    (r: any) => r.status === 'registered'
  ).length;

  const status = registeredCount < this.maxParticipants ? 'registered' : 'waitlisted';

  this.registrations.push({
    userId: userObjectId,
    status,
    registeredAt: new Date()
  });

  await this.save();
  return status;
};

export const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);
