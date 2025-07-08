import { Request, Response } from 'express';
import { Lesson, ILesson } from '../models/Lesson.model';
import { Types } from 'mongoose';

// Create a new lesson
export const createLesson = async (req: Request, res: Response): Promise<void> => {
  const { title, content, date, maxParticipants } = req.body;

  if (!title || !content || !date) {
    res.status(400).json({ message: 'Please provide title, content, and date' });
    return;
  }

  try {
    const newLesson = new Lesson({ 
      title, 
      content, 
      date: new Date(date),
      maxParticipants
    });
    
    await newLesson.save();
    res.status(201).json({ 
      success: true,
      data: newLesson 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lesson',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all lessons
export const getLessons = async (req: Request, res: Response): Promise<void> => {
  try {
    const lessons = await Lesson.find()
      .populate('registrations.userId', 'fullName email')
      .sort({ date: 1 });
      
    res.status(200).json({ 
      success: true, 
      data: lessons 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Register user for a lesson
export const registerForLesson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const userId = req.user?._id; // From auth middleware

    if (!userId) {
      res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
      return;
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      res.status(404).json({ 
        success: false, 
        message: 'Lesson not found' 
      });
      return;
    }

    // Use the model method to handle registration
    const status = await (lesson as any).registerUser(userId);
    
    res.status(200).json({ 
      success: true, 
      data: { 
        lessonId: lesson._id,
        status,
        registeredAt: new Date()
      } 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error registering for lesson',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get user's registered lessons
export const getUserLessons = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id; // From auth middleware
    
    if (!userId) {
      res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
      return;
    }

    const lessons = await Lesson.find({
      'registrations.userId': userId,
      'registrations.status': { $ne: 'cancelled' }
    })
    .sort({ date: 1 });
    
    res.status(200).json({ 
      success: true, 
      data: lessons 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user lessons',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};