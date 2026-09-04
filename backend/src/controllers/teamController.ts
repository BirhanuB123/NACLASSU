import { Request, Response } from 'express';
import { TeamMember } from '../models/TeamMember.model';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary';

// GET /api/team — public
export const getMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await TeamMember.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching team members', details: error instanceof Error ? error.message : error },
    });
  }
};

// POST /api/team — admin only. Accepts multipart/form-data with an optional
// "photo" file; falls back to a pre-hosted photoUrl string in the body for
// backwards compatibility.
export const createMembers = async (req: Request, res: Response): Promise<void> => {
  const { name, position, bio } = req.body;
  let { photoUrl } = req.body;
  let photoStoragePath: string | undefined;

  if (!name || !position || !bio) {
    res.status(400).json({ message: 'Please provide name, position, and bio' });
    return;
  }

  try {
    if (req.file) {
      const uploaded = await uploadBufferToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'nassu/team',
        'image'
      );
      photoUrl = uploaded.url;
      photoStoragePath = uploaded.publicId;
    }

    if (!photoUrl) {
      res.status(400).json({ message: 'Please provide a photo file or a photoUrl' });
      return;
    }

    const newMember = new TeamMember({ name, position, bio, photoUrl, photoStoragePath });
    await newMember.save();
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating team member',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// PUT /api/team/:id — admin only. Replaces the photo in storage if a new
// file is uploaded, otherwise leaves the existing one in place.
export const updateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      res.status(404).json({ success: false, error: { message: 'Team member not found' } });
      return;
    }

    const { name, position, bio } = req.body;
    if (name !== undefined) member.name = name;
    if (position !== undefined) member.position = position;
    if (bio !== undefined) member.bio = bio;

    if (req.file) {
      const oldStoragePath = member.photoStoragePath;
      const uploaded = await uploadBufferToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'nassu/team',
        'image'
      );
      member.photoUrl = uploaded.url;
      member.photoStoragePath = uploaded.publicId;
      if (oldStoragePath) await deleteFromCloudinary(oldStoragePath, 'image');
    }

    await member.save();
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error updating team member', details: error instanceof Error ? error.message : error },
    });
  }
};

// DELETE /api/team/:id — admin only
export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      res.status(404).json({ success: false, error: { message: 'Team member not found' } });
      return;
    }

    if (member.photoStoragePath) await deleteFromCloudinary(member.photoStoragePath, 'image');
    await member.deleteOne();

    res.status(200).json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error deleting team member', details: error instanceof Error ? error.message : error },
    });
  }
};

