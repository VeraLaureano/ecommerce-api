import 'dotenv/config';

// Define a constant to store the URI for a MongoDB database
export const MONGO_URI = process.env.MONGO_URI;

// Define a constant to store the port number that the application listens on
export const PORT = process.env.PORT;

// Define a constant to store the version number of the application
export const VERSION = process.env.VERSION;

// Define a constant to store the environment that the application is running in
export const NODE_ENV = process.env.NODE_ENV;

// Define a constant to store the secret key of the application
export const SECRET_KEY = process.env.SECRET_KEY;
