import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest.interface';
import { UNAUTHORIZED } from '../config/statusCode';
import { logError } from '../utils/loggers';
import { decoded } from '../utils/decoded';
import { findUserAuth } from '../services/user.service';

// Middleware for user authentication.
// It checks the authorization token in the request headers.
export const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Extract the authorization header.
  const auth = req.headers.authorization;

  // If no authorization header or it doesn't start with 'Bearer', return an 'UNAUTHORIZED' error.
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(UNAUTHORIZED).json({ message: 'UNAUTHORIZED' });

  // Extract the token from the authorization header.
  const token = auth.split(' ')[1];

  try {
    // Decode the token to get the user ID.
    const { userID } = decoded(token);

    // Find the user based on the decoded user ID.
    const user = await findUserAuth(userID);

    // If no user is found, return an 'USER_NOT_FOUND' error.
    if (!user)
      return res.status(UNAUTHORIZED).json({ message: 'USER_NOT_FOUND' });

    // Set the user object in the request context.
    req.user = user;
  } catch (error) {
    // Log any errors related to token decoding.
    logError(error);
  }

  // Proceed to the next middleware or route handler.
  return next();
};
