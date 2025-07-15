
import express, { Request, Response, NextFunction } from 'express';
import { login } from '../controllers/authController';
import User from '../models/User.model';
const router = express.Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/api/users', asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;

    if(!userData.firstName || !userData.lastName || !userData.email) {
        return res.status(400).json({success: false, message: 'Please provide all required fields'});
    }

    const newUser = new User(userData);
    try {
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    } catch (error: any) {
        console.error("Error in Create User:", error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}));

export default router;

















/*

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

export default router;
*/
