import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Accessing MongoDB URI and JWT Secret from .env
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri) {
  console.error('MongoDB URI not provided in environment variables');
  process.exit(1);
}

const connectDb = async (): Promise<void> => {
  // Check if MongoDB is already connected
  if (mongoose.connection.readyState) {
    return; // Already connected
  }

  
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDb;
