import { Types } from 'mongoose';
import { ParamsDictionary, Query } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface UserPayload {
      uid: string;
      email: string;
      _id: string;
      role: 'user' | 'admin';
      fullName: string;
      [key: string]: any;
    }
  }
}

// Extend the Express Request type to include user
declare module 'express-serve-static-core' {
  interface Request<ReqBody = any, ResBody = any, ReqQuery = Query> {
    user?: Express.UserPayload;
  }
}

export interface AuthenticatedRequest extends Express.Request {
  user: Express.UserPayload;
  body: any;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
}
