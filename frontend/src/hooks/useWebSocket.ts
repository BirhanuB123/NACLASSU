import { useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

// Use Vite environment variable with fallback
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('WebSocket URL:', SOCKET_URL);

interface WebSocketHandlers {
  onPaymentUpdate?: (payment: any) => void;
  onNewPayment?: (payment: any) => void;
  onPaymentStatusChange?: (data: { paymentId: string; status: string }) => void;
}

export const useWebSocket = (handlers: WebSocketHandlers) => {
  const { user } = useAuth();

  const setupSocket = useCallback(() => {
    if (!user?.token) {
      console.warn('No user token available for WebSocket connection');
      return null;
    }

    try {
      console.log('Initializing WebSocket connection...');
      const socket = io(SOCKET_URL, {
        auth: {
          token: user.token,
        },
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on('connect', () => {
        console.log('WebSocket connected successfully');
      });

      socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
      });

      socket.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason);
      });

      return socket;
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
      return null;
    }
  }, [user?.token]);

  useEffect(() => {
    console.log('Setting up WebSocket handlers...');
    const socket = setupSocket();
    
    if (!socket) {
      console.warn('WebSocket not initialized - missing socket instance');
      return;
    }

    // Set up event listeners with error handling
    const setupEventListeners = () => {
      try {
        if (handlers.onPaymentUpdate) {
          socket.on('payment:update', (data) => {
            console.log('Received payment:update event:', data);
            handlers.onPaymentUpdate?.(data);
          });
        }

        if (handlers.onNewPayment) {
          socket.on('payment:new', (data) => {
            console.log('Received payment:new event:', data);
            handlers.onNewPayment?.(data);
          });
        }

        if (handlers.onPaymentStatusChange) {
          socket.on('payment:status', (data) => {
            console.log('Received payment:status event:', data);
            handlers.onPaymentStatusChange?.(data);
          });
        }
      } catch (error) {
        console.error('Error setting up WebSocket event listeners:', error);
      }
    };

    // Initial setup
    setupEventListeners();

    // Clean up on unmount or when dependencies change
    return () => {
      console.log('Cleaning up WebSocket connection...');
      try {
        if (handlers.onPaymentUpdate) {
          socket.off('payment:update');
        }
        if (handlers.onNewPayment) {
          socket.off('payment:new');
        }
        if (handlers.onPaymentStatusChange) {
          socket.off('payment:status');
        }
        socket.disconnect();
      } catch (error) {
        console.error('Error during WebSocket cleanup:', error);
      }
    };
  }, [setupSocket, handlers]);
};
