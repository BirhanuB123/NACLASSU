import { Request, Response } from 'express';
import User from '../models/User.model';
import jwt from 'jsonwebtoken';
import { getAuth } from 'firebase-admin/auth';
import { UserDocument } from '../middleware/authMiddleware';

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

    // Get user from MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found in database' 
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
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
