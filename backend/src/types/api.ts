export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  lastLogin?: Date;
  failedLoginAttempts: number;
  isLocked: boolean;
  lockUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  _id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  _id: string;
  title: string;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
