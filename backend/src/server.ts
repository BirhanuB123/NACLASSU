import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db';

import { apiLimiter, xssProtection, corsConfig } from './middleware/security';

import dotenv from 'dotenv';
dotenv.config();

import users from './routes/user.route';
import auth from './routes/auth.route';
import lessons from './routes/lesson.route';
import teamMembers from './routes/teamMember.route';
import payments from './routes/payment.route';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(apiLimiter);
app.use(xssProtection);
app.use(cors(corsConfig));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/lessons', lessons);
app.use('/api/teamMembers', teamMembers);
app.use('/api/payments', payments);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
