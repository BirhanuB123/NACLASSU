import express from 'express';
import { auth, admin } from '../middleware/auth';
import { uploadDocument as uploadDocMiddleware } from '../middleware/upload';
import { getDocuments, uploadDocument, deleteDocument } from '../controllers/documentController';
import { errorHandler } from '../middleware/errorHandler';

const router = express.Router();

router.get('/', getDocuments);
router.post('/', auth, admin, uploadDocMiddleware.single('file'), uploadDocument);
router.delete('/:id', auth, admin, deleteDocument);

router.use(errorHandler);

export default router;
