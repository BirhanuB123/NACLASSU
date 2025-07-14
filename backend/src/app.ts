import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import teamRoutes from './routes/team';
import lessonRoutes from './routes/lessons';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);


export default app;
