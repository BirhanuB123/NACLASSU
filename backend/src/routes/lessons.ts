import express from 'express';
import { getLessons } from '../controllers/lessonController';
const router = express.Router();

router.get('/', getLessons);

export default router;