import { Request, Response } from 'express';
import DocumentModel from '../models/Document.model';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary';

// GET /api/documents?category=lessons — public
export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    const documents = await DocumentModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching documents', details: error instanceof Error ? error.message : error },
    });
  }
};

// POST /api/documents — admin only, multipart/form-data with field "file"
export const uploadDocument = async (req: Request, res: Response): Promise<void> => {
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
      'nassu/documents',
      'raw'
    );

    const document = await DocumentModel.create({
      title,
      description: description || '',
      category: category || 'general',
      fileType: 'pdf',
      url,
      storagePath: publicId,
      uploadedBy: req.user?._id,
    });

    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error uploading document', details: error instanceof Error ? error.message : error },
    });
  }
};

// DELETE /api/documents/:id — admin only
export const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const document = await DocumentModel.findById(req.params.id);
    if (!document) {
      res.status(404).json({ success: false, error: { message: 'Document not found' } });
      return;
    }

    if (document.storagePath) {
      await deleteFromCloudinary(document.storagePath, 'raw');
    }
    await document.deleteOne();

    res.status(200).json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error deleting document', details: error instanceof Error ? error.message : error },
    });
  }
};

