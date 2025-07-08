import { Request, Response, NextFunction } from 'express';
import { verifyIdToken } from '../config/firebase';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyIdToken(token);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Add user info to request object
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
