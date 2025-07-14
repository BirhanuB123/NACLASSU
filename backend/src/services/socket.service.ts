import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { verifyIdToken } from '../config/firebase';

class SocketService {
  private io: Server;
  private static instance: SocketService;

  private constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    this.initializeSocketEvents();
  }

  public static getInstance(server?: HttpServer): SocketService {
    if (!SocketService.instance && server) {
      SocketService.instance = new SocketService(server);
    }
    return SocketService.instance;
  }

  private initializeSocketEvents(): void {
    this.io.use(async (socket: any, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.query.token;
        if (!token) {
          return next(new Error('Authentication error: No token provided'));
        }

        const decoded = await verifyIdToken(token);
        if (!decoded) {
          return next(new Error('Authentication error: Invalid token'));
        }

        socket.user = decoded;
        next();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown authentication error';
        next(new Error(`Authentication error: ${errorMessage}`));
      }
    });

    this.io.on('connection', (socket: any) => {
      console.log('New client connected:', socket.user?.email);

      // Join admin room if user is admin
      if (socket.user?.role === 'admin') {
        socket.join('admin');
        console.log('Admin connected:', socket.user.email);
      }

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.user?.email);
      });
    });
  }

  // Method to emit payment updates to admin clients
  public emitPaymentUpdate(payment: any): void {
    this.io.to('admin').emit('payment:update', payment);
  }

  // Method to emit new payment to admin clients
  public emitNewPayment(payment: any): void {
    this.io.to('admin').emit('payment:new', payment);
  }

  // Method to emit payment status change
  public emitPaymentStatusChange(paymentId: string, status: string): void {
    this.io.to('admin').emit('payment:status', { paymentId, status });
  }

  // Get the io instance
  public getIO(): Server {
    return this.io;
  }
}

export default SocketService;
