import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import errors from '@shared/errors/errors';

export default (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    const { statusCode, message } = error;
    return response.status(statusCode).json({ status: 'error', message });
  }

  if (process.env.NODE_ENV === 'development') console.log(error);

  const { status, message } = errors['default-message'];
  return response.status(status).json({ status: 'error', message });
};
