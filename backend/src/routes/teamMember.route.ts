import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { TeamMember } from '../models/TeamMember.model';
import { errorHandler } from '../middleware/errorHandler';
import { createMembers } from '../controllers/teamController';
import axios from 'axios';

const router = express.Router();

// Team Member Route
router.post('/', createMembers);

// Global Error Handler (last)
router.use(errorHandler);

export default router;