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
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  if (process.env.NODE_ENV === 'development') console.log(error);

  return response
    .status(errors['default-message'].status)
    .json({ status: 'error', message: errors['default-message'].message });
};
