import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import teamRoutes from './routes/team';
import lessonRoutes from './routes/lessons';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/lessons', lessonRoutes);

app.use(errorHandler);


export default app;
