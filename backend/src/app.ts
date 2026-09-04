// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import authRoutes from './routes/auth.route';
// import teamRoutes from './routes/team';
// import lessonRoutes from './routes/lessons';
// import paymentRoutes from './routes/payment.routes';
// import adminRoutes from './routes/admin.routes';
// import { errorHandler } from './middleware/errorHandler';
// import { apiLimiter, xssProtection, corsConfig } from './middleware/security';

// const app = express();

// // Security Middlewares
// app.use(helmet());
// app.use(apiLimiter);
// app.use(xssProtection);
// app.use(cors(corsConfig));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/team', teamRoutes);
// app.use('/api/lessons', lessonRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/admin', adminRoutes);

// app.use(errorHandler);

// export default app;


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.route';
import teamRoutes from './routes/teamMember.route'; // was './routes/team' — that stub never used the real TeamMember model/controller
import lessonRoutes from './routes/lessons';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';
import photoRoutes from './routes/photo.route';
import documentRoutes from './routes/document.route';
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

// Health check endpoints for Render and monitoring
app.get('/', (req, res) => {
  res.status(200).send('NASSU Backend API is active');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/documents', documentRoutes);

app.use(errorHandler);

export default app;
