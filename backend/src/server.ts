import http from 'http';
import helmet from 'helmet';
import path from 'path';

// Import environment configuration first
import './config/env';
import config from './config/env';
import connectDB from './config/db';
import SocketService from './services/socket.service';
import { apiLimiter, xssProtection, corsConfig } from './middleware/security';

// Import the configured app
import app from './app';

const server = http.createServer(app);

// Initialize WebSocket server
SocketService.getInstance(server);

// Connect to MongoDB
connectDB();

// Start server
const PORT = Number(process.env.PORT) || 5000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} (0.0.0.0)`);
  console.log(`WebSocket server running on port ${PORT}`);
});
