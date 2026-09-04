import express from 'express';
import { auth, admin } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { getPhotos, uploadPhoto, deletePhoto } from '../controllers/photoController';
import { errorHandler } from '../middleware/errorHandler';

const router = express.Router();

router.get('/', getPhotos);
router.post('/', auth, admin, uploadImage.single('file'), uploadPhoto);
router.delete('/:id', auth, admin, deletePhoto);

router.use(errorHandler);

export default router;
