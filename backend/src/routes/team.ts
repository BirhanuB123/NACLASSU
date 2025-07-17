import express from 'express';
import { getTeam } from '../controllers/teamController';
const router = express.Router();

router.get('/', getTeam);

export default router;