import User from '../models/User.model';
import { TeamMember } from '../models/TeamMember.model';
import { Request, Response } from 'express';

export const createMembers = async (req: Request, res: Response): Promise<void> => {
  const { name, position, bio, photoUrl } = req.body;

  if (!name || !position || !bio || !photoUrl) {
    res.status(400).json({ message: 'Please provide name, position, bio, and photo URL' });
    return;
  }

  try {
    const newMember = new TeamMember({ name, position, bio, photoUrl });
    await newMember.save();
    res.status(201).json({ message: 'Team member created successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating team member',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}