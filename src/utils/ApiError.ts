import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();

  // 1. Terminal Detailed Log (Always prints exact error context for debugging)
  console.error('\n========== ❌ EXPRESS ERROR DETECTED ==========');
  console.error(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  console.error('Headers:', JSON.stringify(req.headers, null, 2));
  console.error('Body:', JSON.stringify(req.body, null, 2));
  console.error('Cookies:', req.cookies);
  console.error('Error Name:', err?.name);
  console.error('Error Message:', err?.message);

  if (err?.code) console.error('Error Code (Prisma/System):', err.code);
  if (err?.stack) console.error('Stack Trace:\n', err.stack);
  console.error('===============================================\n');

  // 2. Handle Zod Validation Errors (400 Bad Request)
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues.map((e) => ({
        field: e.path.join('.').replace(/^(body|query|params)\./, ''),
        message: e.message,
      })),
    });
  }

  // 3. Handle Prisma Known Database Errors (e.g., P2002 Unique Constraint Violation)
  if (err?.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') || 'field';
      return res.status(409).json({
        success: false,
        message: `A record with this ${target} already exists.`,
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found in database.',
      });
    }
  }

  // 4. Handle JWT Token Errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token format' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token has expired' });
  }

  // 5. Fallback Default Internal Server Error (500)
  const statusCode = err.status || err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Expose stack trace only in development
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};