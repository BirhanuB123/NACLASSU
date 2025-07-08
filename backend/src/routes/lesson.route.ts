import express, { RequestHandler } from 'express';
import { 
  createLesson, 
  getLessons, 
  registerForLesson, 
  getUserLessons 
} from '../controllers/lessonController';
import { protect } from '../middleware/authMiddleware';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Public routes
router.get('/', asyncHandler(getLessons));

// Protected routes (require authentication)
router.use(protect as unknown as RequestHandler);
router.post('/', asyncHandler(createLesson));
router.post('/:lessonId/register', asyncHandler(registerForLesson));
router.get('/my-lessons', asyncHandler(getUserLessons));

export default router;