const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
dotenv.config({ path: "./src/config/config.env" });

const app = express();

//Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes import

//Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
// app.use("/auth", authRoutes);
// app.use("/comment", commentRoutes);
// app.use("/sajak", sajakRoutes);
// app.use("/user", userRoutes);

// ? Error handler\
// ? will be called automatically when the url doesn't exist or it's wrong
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
// ? End error handling

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server Singkat Sajak running on port ${PORT}`
  );
});
