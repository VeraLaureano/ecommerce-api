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

export const SUPABASE_USER = process.env.SUPABASE_USER;
export const SUPABASE_HOST = process.env.SUPABASE_HOST;
export const SUPABASE_DB_NAME = process.env.SUPABASE_DB_NAME;
export const SUPABASE_PASSWORD = process.env.SUPABASE_PASSWORD;
export const SUPABASE_PORT = process.env.SUPABASE_PORT;
export const SUPABASE_URI = process.env.SUPABASE_URI;
export const SUPABASE_CLIENT_ANON_KEY = process.env.SUPABASE_CLIENT_ANON_KEY;
export const SUPABASE_URL = process.env.SUPABASE_URL;