import express from 'express';
import { auth, admin } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { getMembers, createMembers, updateMember, deleteMember } from '../controllers/teamController';
import { errorHandler } from '../middleware/errorHandler';

const router = express.Router();

router.get('/', getMembers);
router.post('/', auth, admin, uploadImage.single('photo'), createMembers);
router.put('/:id', auth, admin, uploadImage.single('photo'), updateMember);
router.delete('/:id', auth, admin, deleteMember);

// Global Error Handler (last)
router.use(errorHandler);

export default router;
