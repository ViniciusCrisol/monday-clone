import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface IPayloadToken {
  iat: number;
  exp: number;
  sub: string;
}

export default (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError('missingJWT');

  const token = authHeader.split(' ')[1];
  try {
    const { sub } = verify(token, authConfig.jwt.secret) as IPayloadToken;
    request.user = { id: sub };
    return next();
  } catch {
    throw new AppError('invalidJWT');
  }
};
