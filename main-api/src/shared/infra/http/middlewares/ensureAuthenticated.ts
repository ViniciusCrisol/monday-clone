import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { jwtIsMissing, jwtIsInvalid } from '@shared/errors/messages';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError(jwtIsMissing.message, jwtIsMissing.status);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;
    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError(jwtIsInvalid.message, jwtIsInvalid.status);
  }
}
