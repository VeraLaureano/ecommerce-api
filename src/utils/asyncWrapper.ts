// Import modules
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest.interface';

// Define a function to wrap an asynchronous Express route handler function
export const asyncWrapper = (
  callback: (req: AuthenticatedRequest, res: Response, next?: NextFunction) => void
) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // Call the original callback function
      await callback(req, res, next);
    } catch (error) {
      // Pass any errors to the next middleware function
      next(error);
    }
  };
};
