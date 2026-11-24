const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB Connection with Promise & Error Handling
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/university_db";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully 🚀"))
  .catch((err) => console.log("MongoDB Connection Error:", err.message));

// Test Route
app.get("/", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    message: "Server Running & MongoDB Connected ✔",
    dbStatus: isConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

