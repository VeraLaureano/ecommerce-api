// Import modules
import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest.interface';
import { routes } from '../config/routes';

// Define a function to handle 404 errors
export const notFound = (req: AuthenticatedRequest, res: Response) => {
  // Set the status code of the response to 404
  return res.status(404).json({
    app_name: 'Ecommerce API',
    actual_path: req.path,
    user: [
      {
        path: routes.user,
        methods: ['GET', 'PATCH', 'DELETE']
      },
      {
        path: `${routes.user}/login`,
        methods: ['POST']
      }, 
      {
        path: `${routes.user}/signup`,
        methods: ['POST']
      }
    ],
    docs: routes.docs
  });
};
