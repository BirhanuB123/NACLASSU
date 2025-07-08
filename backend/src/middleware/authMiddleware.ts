// Improved authMiddleware.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import mongoose from 'mongoose';
import { Types } from 'mongoose';

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

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  lastLogin?: Date;
  failedLoginAttempts?: number;
  isLocked?: boolean;
  lockUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  handleFailedLogin(): Promise<void>;
  resetFailedLoginAttempts(): Promise<void>;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface UserPayload {
      _id: string;
      email: string;
      role: 'user' | 'admin';
      fullName: string;
    }
    
    interface Request {
      user?: UserPayload;
    }
  }
}

interface UserObject {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  lastLogin?: Date | null;
  failedLoginAttempts?: number;
  isLocked?: boolean;
  lockUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to convert UserDocument or UserObject to UserPayload
function toUserPayload(user: UserDocument | UserObject): Express.UserPayload {
  return {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
    fullName: user.fullName
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