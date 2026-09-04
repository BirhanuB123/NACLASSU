import { Request, Response } from 'express';
import Photo from '../models/Photo';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary';

// GET /api/photos?category=gallery — public
export const getPhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    const photos = await Photo.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching photos', details: error instanceof Error ? error.message : error },
    });
  }
};

// POST /api/photos — admin only, multipart/form-data with field "file"
export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: { message: 'No file uploaded' } });
      return;
    }

    const { title, description, category } = req.body;
    if (!title) {
      res.status(400).json({ success: false, error: { message: 'Title is required' } });
      return;
    }

    const { url, publicId } = await uploadBufferToCloudinary(
      req.file.buffer,
      req.file.originalname,
      'nassu/gallery',
      'image'
    );

    const photo = await Photo.create({
      title,
      description: description || '',
      category: category || 'gallery',
      url,
      storagePath: publicId,
      uploadedBy: req.user?._id,
    });

    res.status(201).json({ success: true, data: photo });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error uploading photo', details: error instanceof Error ? error.message : error },
    });
  }
};

// DELETE /api/photos/:id — admin only
export const deletePhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      res.status(404).json({ success: false, error: { message: 'Photo not found' } });
      return;
    }

    if (photo.storagePath) {
      await deleteFromCloudinary(photo.storagePath, 'image');
    }
    await photo.deleteOne();

    res.status(200).json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error deleting photo', details: error instanceof Error ? error.message : error },
    });
  }
};

