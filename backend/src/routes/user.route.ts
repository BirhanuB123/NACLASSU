import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.model';
import { errorHandler } from '../middleware/errorHandler';
import { getUsers, createUsers, updateUsers, deleteUsers } from '../controllers/userController';
import { auth, admin } from '../middleware/auth';

const router = express.Router();

// All user management endpoints in this file are admin-protected via middleware below
router.use(auth);
router.use(admin);

// Get user by ID
router.get('/', getUsers);

// Create new user
router.post('/', createUsers);

// Update user
router.put('/:id', updateUsers);

// Delete user
router.delete('/:id', deleteUsers);

// Global Error Handler (last)
router.use(errorHandler);

export default router;