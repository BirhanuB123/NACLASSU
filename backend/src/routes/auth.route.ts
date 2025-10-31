import { Router, Request, Response, NextFunction } from 'express';
import { login, getCurrentUser } from '../controllers/authController';
import { errorHandler } from '../middleware/errorHandler';

const router = Router();

// Login route
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

// Get current user profile
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getCurrentUser(req, res);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware should be the last one
router.use(errorHandler);

export default router;
