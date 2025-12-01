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
      uid: decodedToken.uid,
      email: user.email,
      _id: user._id.toString(),
      role: user.role || 'user',
      fullName: user.fullName || ''
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export const admin: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthenticatedRequest;
  
  if (!authReq.user) {
    console.warn('Admin middleware: No user found in request');
    res.status(403).json({ 
      error: 'Forbidden - Admin access required',
      message: 'User authentication required'
    });
    return;
  }
  
  if (authReq.user.role !== 'admin') {
    console.warn(`Admin middleware: User ${authReq.user.email} attempted admin access with role: ${authReq.user.role}`);
    res.status(403).json({ 
      error: 'Forbidden - Admin access required',
      message: `User role '${authReq.user.role}' does not have admin privileges`
    });
    return;
  }
  
  console.log(`Admin middleware: Admin access granted to ${authReq.user.email}`);
  next();
};
