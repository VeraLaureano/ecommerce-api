import { TIMEOUT } from '../config/statusCode';
import { AuthenticatedRequest } from '../interfaces/AuthRequest.interface';
import { Response, NextFunction } from 'express';
 
/**
 * Middleware for setting an HTTP timeout on requests.
 * If a request does not complete within the specified time,
 * it will be canceled, and an appropriate response will be sent.
 *
 * @param {AuthenticatedRequest} req - The incoming request.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const httpTimeout = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Set a timeout of 10 seconds for the request
  req.setTimeout(10000);

  // Handle the 'timeout' event
  req.on('timeout', () => {
    // Send an HTTP 504 (Gateway Timeout) response
    res.status(TIMEOUT).send('HTTP timeout. Try again.');
  });

  // Continue to the next middleware
  next();
};
