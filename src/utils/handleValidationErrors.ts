import { Request, Response } from 'express';  // Importing the Request and Response types from Express to type the incoming request and outgoing response
import { validationResult } from 'express-validator';  // Importing the validationResult function from 'express-validator' to check if validation has failed

// Middleware function to handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: Function) => {
  // Use validationResult to check if there are any validation errors in the request
  const errors = validationResult(req);

  // If there are errors (i.e., validation failed), send a 400 status with the error details
  if (!errors.isEmpty()) {
    // Respond with status 400 (Bad Request) and an array of error messages
    return res.status(400).json({ errors: errors.array() });
  }

  // If there are no validation errors, proceed to the next middleware or route handler
  return next();
};
