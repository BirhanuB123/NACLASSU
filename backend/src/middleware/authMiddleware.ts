// Improved authMiddleware.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import { Types, Document } from 'mongoose';

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 100, // Number of points
  duration: 60, // Per minute
  blockDuration: 60 * 60 // Block for 1 hour if rate limited
});

// Base user interface
export interface IUserBase {
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  password?: string;
  lastLogin?: Date | null;
  failedLoginAttempts?: number;
  isLocked?: boolean;
  lockUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Document type (Mongoose document with methods)
export interface IUserDocument extends IUserBase, Document<Types.ObjectId> {
  comparePassword(candidatePassword: string): Promise<boolean>;
  handleFailedLogin(): Promise<void>;
  resetFailedLoginAttempts(): Promise<void>;
}

// Plain object type (e.g., when using .lean())
export interface IUserObject extends IUserBase {
  _id: Types.ObjectId | string;
}

// Type for authenticated user in requests
export interface IUserPayload {
  uid: string;  
  _id?: string | Types.ObjectId;  
  fullName?: string;
  email?: string;  // Made optional to match actual usage
  role: 'user' | 'admin';
  lastLogin?: Date | null;
  failedLoginAttempts?: number;
  isLocked?: boolean;
  lockUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Extend Express types
declare global {
  namespace Express {
    // UserPayload is now imported from types/express
    
    interface Request {
      user?: UserPayload;
    }
  }
}

// Re-export for backward compatibility
export type UserDocument = IUserDocument;
export type UserObject = IUserObject;

// Helper function to convert UserDocument or UserObject to UserPayload
function toUserPayload(user: IUserDocument | IUserObject): IUserPayload {
  // Type guard to check if it's a document with methods
  const isDocument = (u: IUserDocument | IUserObject): u is IUserDocument => {
    return '_id' in u && !(u._id instanceof String || typeof u._id === 'string');
  };

  const basePayload: Omit<IUserPayload, 'uid' | '_id'> = {
    fullName: user.fullName,
    email: user.email,
    role: user.role || 'user',  // Default to 'user' if role is undefined
    lastLogin: user.lastLogin || undefined,
    failedLoginAttempts: user.failedLoginAttempts,
    isLocked: user.isLocked,
    lockUntil: user.lockUntil || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  // Convert _id to string for the payload
  const id = isDocument(user) ? user._id.toString() : user._id;
  
  return {
    ...basePayload,
    uid: id.toString(),
    _id: id.toString()
  };
}

interface AuthRequest extends Request {
  user?: Express.UserPayload;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Rate limiting
    //const { ip } = req;
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const rateLimitResult = await rateLimiter.consume(ip);
    
    if (rateLimitResult.consumedPoints > rateLimitResult.remainingPoints) {
      return res.status(429).json({
        success: false,
        error: {
          message: 'Too many requests. Please try again later.'
        }
      });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'No token, authorization denied'
        }
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
        id: string;
        exp: number;
      };

      // Check token expiration
      if (Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Token expired'
          }
        });
      }

      // Get user
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'User not found'
          }
        });
      }

      // Convert user to UserPayload and add to request
      req.user = toUserPayload(user);

      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid token'
        }
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({
      success: false,
      error: {
        message: 'Not authorized',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
};