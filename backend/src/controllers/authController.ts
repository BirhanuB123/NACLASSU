import { Request, Response } from 'express';
import User from '../models/User.model';
import jwt from 'jsonwebtoken';
import { getAuth } from 'firebase-admin/auth';
import { UserDocument } from '../middleware/authMiddleware';

// Register new user (public endpoint)
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user in MongoDB
    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password,
      role: 'user' // Default role
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      }
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((e: any) => e.message).join(', ')
      });
    }
    
    // Handle connection errors
    if (error.name === 'MongoNetworkError' || error.message?.includes('connection')) {
      return res.status(503).json({
        success: false,
        message: 'Database connection error. Please try again later.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during registration'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID token is required' 
      });
    }

    // Verify Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const email = decodedToken.email;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if user exists in MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found. Please sign up first.' 
      });
    }

    // Update last login time and save
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { lastLogin: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found after update' 
      });
    }

    // Create JWT token for API access
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        },
        token
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'An error occurred during login' 
    });
  }
};

// Get current user profile (requires Firebase auth)
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const email = decodedToken.email;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email not found in token' 
      });
    }

    // Get user from MongoDB (case-insensitive email lookup)
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found in database' 
      });
    }

    console.log('[getCurrentUser] User found:', {
      email: user.email,
      role: user.role,
      fullName: user.fullName
    });

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role || 'user' // Ensure role is always returned
      }
    });

  } catch (error: any) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'An error occurred while fetching user profile' 
    });
  }
};

// Add this to your existing exports if you have them
export default {
  login,
  getCurrentUser
};
