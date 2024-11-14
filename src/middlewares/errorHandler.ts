import { Error } from 'mongoose';
import { INTERNAL_SERVER_ERROR } from '../config/statusCode';
import { logError } from '../utils/loggers';
import { AuthenticatedRequest } from '../interfaces/AuthRequest.interface';
import { NextFunction, Response } from 'express';

export const errorHandler = (err: Error, _req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (err) {
    logError(err);
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
  else
    next();
};