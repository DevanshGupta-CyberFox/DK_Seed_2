// import mongoose from 'mongoose';

// export async function connectDB() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) {
//     throw new Error('MONGODB_URI is not set in environment variables');
//   }
//   await mongoose.connect(uri);
//   console.log('MongoDB connected');
// }

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set in environment variables');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        console.log('MongoDB connected');
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error('MongoDB connection failed:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}