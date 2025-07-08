import 'express';

declare global {
  namespace Express {
    interface UserPayload {
      _id: string;
      email: string;
      role: 'user' | 'admin';
      fullName: string;
      [key: string]: any;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
