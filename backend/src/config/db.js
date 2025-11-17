const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not set in environment");
}
let cached = global._mongoConnection;

if (!cached) {
  cached = global._mongoConnection = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        cached.conn = mongooseInstance;
        return cached.conn;
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  return cached.promise;
}

module.exports = connectDB;
