// Import modules
import mongoose, { set } from 'mongoose';

// Set strict mode in querys
set('strictQuery', true);

// Define a function to connect to a MongoDB database
const connectDB: (a: string) => void = (uri: string) => {
  async function run() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await mongoose.disconnect();
    }
  }
  
  run().catch(console.dir);
};

// Export the connectDB function
export default connectDB;
