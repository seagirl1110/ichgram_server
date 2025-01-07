import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (typeof MONGO_URI !== 'string') {
  throw new Error('MONGO_URI is required');
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connection to MongoDB is successfully');
  } catch (error) {
    console.log('Error connection to MongoDB: ', error);
  }
};

export default connectDB;
