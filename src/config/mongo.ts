// Import modules
import mongoose, { set } from 'mongoose';
import { logError, logInfo } from '../utils/loggers';

// Set strict mode in querys
set('strictQuery', true);

// Define a function to connect to a MongoDB database
const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    logInfo('DataBase connected...');
  } catch (error) {
    logError('Error al conectar a MongoDB');
    logError(error);
    process.exit(1);  // Detiene la ejecución si no puede conectar
  }
};

// Export the connectDB function
export default connectDB;
