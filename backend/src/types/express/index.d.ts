import 'express';

declare global {
  namespace Express {
    interface UserPayload {
      uid: string;
      _id?: string | any;  // Using 'any' to match mongoose.Types.ObjectId
      fullName?: string;
      email?: string;
      role: 'user' | 'admin';
      lastLogin?: Date | null;
      failedLoginAttempts?: number;
      isLocked?: boolean;
      lockUntil?: Date | null;
      createdAt: Date;
      updatedAt: Date;
      [key: string]: any;  // For any additional properties
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
