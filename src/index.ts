/**
 * Copyright (c) 2024 [Your Name or Organization Name]
 * 
 * This code is covered by a Non-Commercial Use License with Attribution.
 * Commercial use is not allowed without prior authorization.
 * For more information, please refer to the LICENSE file.
 */

import app from './app';
import { createServer } from 'http';
// import connectDB from './config/mongo';
import { PORT } from './config/env';
import { logError, logInfo } from './utils/loggers';
import client from './config/pgClient';

// Create a server using the app module
const server = createServer(app);

server.keepAliveTimeout = 30000;

// Define a function to start the server
const start: () => void = async () => {
  try {
    // Connect to MongoDB using the MONGO_URI constant
    //await connectDB(MONGO_URI as string);
    
    // C
    await client.connect()
      .then(() => logInfo("Connected to DB..."))
      .catch(err => logError("Error al conectar a la base de datos", err.stack));

    // Start the server and log information about it
    server.listen(PORT, (): void => {
      logInfo(`Server running on port ${PORT}...`);
      logInfo(`http://localhost:${PORT}/`);
    });
  } catch (err) {
    // Log an error message if there is an error
    logError(err);
  }
};

// Call the start function to start the server
start();
