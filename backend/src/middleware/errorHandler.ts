import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';
import { v4 as uuidv4 } from 'uuid';

// Create logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    new transports.Console()
  ]
});

// Error types
enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTH = 'AUTH',
  SYSTEM = 'SYSTEM',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED'
}

interface ErrorDetails {
  type: ErrorType;
  message: string;
  code?: string;
  details?: any;
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Generate unique request ID
  const requestId = uuidv4();
  
  // Log error details
  logger.error('Error occurred', {
    requestId,
    path: req.path,
    method: req.method,
    error: err,
    stack: err.stack
  });

  // Determine error type and response
  let errorDetails: ErrorDetails;

  if (err.name === 'ValidationError') {
    errorDetails = {
      type: ErrorType.VALIDATION,
      message: 'Validation failed',
      details: err.errors
    };
  } else if (err.name === 'UnauthorizedError') {
    errorDetails = {
      type: ErrorType.AUTH,
      message: 'Unauthorized access',
      code: 'UNAUTHORIZED_ACCESS'
    };
  } else if (err.name === 'NotFoundError') {
    errorDetails = {
      type: ErrorType.NOT_FOUND,
      message: 'Resource not found',
      code: 'RESOURCE_NOT_FOUND'
    };
  } else {
    errorDetails = {
      type: ErrorType.SYSTEM,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    };
  }

  // Set response status
  const statusCode = errorDetails.type === ErrorType.VALIDATION ? 400 :
                    errorDetails.type === ErrorType.NOT_FOUND ? 404 :
                    errorDetails.type === ErrorType.UNAUTHORIZED ? 401 :
                    500;

  // Send response
  res.status(statusCode).json({
    requestId,
    error: {
      type: errorDetails.type,
      message: errorDetails.message,
      ...(errorDetails.type === ErrorType.VALIDATION ? { details: errorDetails.details } : {})
    }
  });
};