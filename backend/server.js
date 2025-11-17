const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const connectDB = require("./src/config/db");

dotenv.config({ path: "./src/config/config.env" });

const app = express();

// Connect DB
connectDB();

// Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// Routes import
const authRoutes = require("./src/routes/authRoutes");
const sajakRoutes = require("./src/routes/sajakRoutes");
const userRoutes = require("./src/routes/userRoutes");

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/auth", authRoutes);
app.use("/sajak", sajakRoutes);
app.use("/user", userRoutes);

// Error handler
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

// EXPORT for Vercel serverless
module.exports = app;

// LOCAL DEV ONLY (Vercel tidak menjalankan ini)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server Singkat Sajak running on port ${PORT}`);
  });
}
