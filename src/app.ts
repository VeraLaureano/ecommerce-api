/**
 * Copyright (c) 2024 [Your Name or Organization Name]
 * 
 * This code is covered by a Non-Commercial Use License with Attribution.
 * Commercial use is not allowed without prior authorization.
 * For more information, please refer to the LICENSE file.
 */

import express from 'express';
import cors from 'cors';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import morgan from 'morgan'
import { notFound } from './middlewares/notFound';
import { routes } from './config/routes';
import { userRouter } from './routes/user.route';
import { errorHandler } from './middlewares/errorHandler';
import { authentication } from './middlewares/auth';
import { authRouter } from './routes/auth.route';
import { apiLimiter } from './utils/limiter';
import { httpTimeout } from './utils/httpTimeout';
import { cardRouter } from './routes/card.route';
import { cartRouter } from './routes/cart.route';
import { cartItemRouter } from './routes/cartItem.route';

/**
 * 
 * N O T A    I M P O R T A N T E:
 *      falta moficar el controlador de cart para la base de datos sql
 *      verificar si existe la carta en el carrito antes de añadir
 *      falta eliminar items del carrito al eliminar usuario
 */

// Create an express application
const app = express();

// Set up middleware functions
app.use(httpTimeout);
app.use(express.json({ limit: '1mb' })); // Limit request body size to 1MB
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(ExpressMongoSanitize({
  onSanitize: ({ req, key }) => {
    console.warn(`This request[${key}] will be sanitized`, req);
  },
}));
app.use(apiLimiter);
app.use(helmet()); // Add default security headers

// Set up routing
app.use(routes.user, userRouter);
app.use(routes.user, authentication, authRouter);
app.use(routes.cards, cardRouter);
app.use(routes.cart, authentication, cartRouter);
app.use(routes.items, authentication, cartItemRouter);

// Set up 404 error handler
app.use(notFound);

// Use the 'errorHandler' middleware for handling errors
app.use(errorHandler);

// Export the Express application
export default app;