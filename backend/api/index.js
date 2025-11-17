const connectDB = require("../src/config/db");
const app = require("../server");

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error("DB connection error (serverless):", err);
    res.status(500).json({ error: "Database connection error" });
  }
};
