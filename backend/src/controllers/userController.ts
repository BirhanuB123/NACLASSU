import User from '../models/User.model';
import { Request, Response } from 'express';
import admin from '../config/firebase';
import { getAuth } from 'firebase-admin/auth';
import { logActivity } from './admin/activity.controller';

// Get user by ID
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find(); 
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create new user
export const createUsers = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({ message: 'Please provide full name, email, and password' });
    return;
  }

  try {
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    await logActivity('create_user', req.user, { userId: newUser._id, email: newUser.email });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Update user
export const updateUsers = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { fullName, email, password, firebaseUid, role } = req.body;

  if (!id) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  try {
    // Update MongoDB
    const updateData: any = { fullName, email };
    if (password) {
      // Only update password if it's provided
      updateData.password = password;
    }
    if (role && ['user', 'admin'].includes(role)) {
      // Only update role if it's provided and valid
      updateData.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found in database' });
      return;
    }

    if (firebaseUid) {
      try {
        const auth = getAuth();
        const updateRequest: any = { displayName: fullName, email };
        if (password) {
          updateRequest.password = password;
        }
        await auth.updateUser(firebaseUid, updateRequest);
      } catch (firebaseError) {
        console.error('Error updating Firebase user:', firebaseError);
      }
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
    await logActivity('update_user', req.user, { userId: updatedUser._id, email: updatedUser.email, role: updatedUser.role });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Update user role (admin only)
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  if (!role || !['user', 'admin'].includes(role)) {
    res.status(400).json({ message: 'Valid role is required (user or admin)' });
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found in database' });
      return;
    }

    res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: {
        id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role
      }
    });

    await logActivity('update_user_role', req.user, {
      userId: updatedUser._id,
      email: updatedUser.email,
      newRole: role
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user role',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Delete user
export const deleteUsers = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firebaseUid } = req.body;

  if (!id) {
    res.status(400).json({ success: false, message: 'User ID is required' });
    return;
  }

  try {
    // Delete from MongoDB
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ success: false, message: 'User not found in database' });
      return;
    }

    // Delete from Firebase Auth if firebaseUid is provided
    if (firebaseUid) {
      try {
        const auth = getAuth();
        await auth.deleteUser(firebaseUid);
      } catch (firebaseError) {
        console.error('Error deleting Firebase user:', firebaseError);
        // Continue with the response even if Firebase deletion fails
      }
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
    await logActivity('delete_user', req.user, { userId: id });
  } catch (error) {
    console.error('Error in delete user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}