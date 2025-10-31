import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.route';
import teamRoutes from './routes/team';
import lessonRoutes from './routes/lessons';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter, xssProtection, corsConfig } from './middleware/security';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(apiLimiter);
app.use(xssProtection);
app.use(cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
