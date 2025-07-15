import express from 'express';
import { createMembers } from '../controllers/teamController';
const router = express.Router();

router.post('/', createMembers);

export default router;