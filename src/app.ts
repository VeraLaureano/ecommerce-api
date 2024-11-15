import express from 'express';
import cors from 'cors';
import ExpressMongoSanitize from 'express-mongo-sanitize';
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

// Create an express application
const app = express();

// Set up middleware functions
app.use(httpTimeout);
app.use(express.json({ limit: '1mb' })); // Limit request body size to 1MB
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(ExpressMongoSanitize({
  onSanitize: ({ req, key }) => {
    console.warn(`This request[${key}] will be sanitized`, req);
  },
}));
app.use(apiLimiter);

// Set up routing
app.use(routes.user, userRouter);
app.use(routes.user, authentication, authRouter);
app.use(routes.cards, cardRouter);
app.use(routes.cart, authentication, cartRouter);

// Set up 404 error handler
app.use(notFound);

// Use the 'errorHandler' middleware for handling errors
app.use(errorHandler);

// Export the Express application
export default app;