import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyIdToken } from '../config/firebase';
import { AuthenticatedRequest } from '../types/express';
import User from '../models/User.model';

interface DecodedToken {
  uid: string;
  email?: string;
  name?: string;
}

export const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized - No token provided' });
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyIdToken(token) as DecodedToken;

    if (!decodedToken) {
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
      return;
    }

    if (!decodedToken.email) {
      res.status(401).json({ error: 'Unauthorized - Invalid token data' });
      return;
    }

    // Try to find the user in the database
    const user = await User.findOne({ email: decodedToken.email });
    
    // If user doesn't exist, you might want to create them or handle accordingly
    if (!user) {
      res.status(403).json({ error: 'User not found' });
      return;
    }

    // Add user info to request object
    (req as AuthenticatedRequest).user = {
      uid: decodedToken.uid, // Firebase UID
      _id: user._id.toString(), // MongoDB _id
      fullName: user.fullName || '',
      email: user.email,
      role: user.role || 'user',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // Optional properties with defaults
      lastLogin: user.lastLogin || undefined,
      failedLoginAttempts: user.failedLoginAttempts,
      isLocked: user.isLocked,
      lockUntil: user.lockUntil || undefined
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export const admin: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.user || authReq.user.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden - Admin access required' });
    return;
  }
  next();
};
