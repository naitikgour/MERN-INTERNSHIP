// Week 5 - Day 4: Main Server Entry File
const express = require("express");
const app = express();

// 1. Built-in Middleware (body parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple CORS header setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// 2. Custom Logger Middleware
const logger = require("./middleware/logger");
app.use(logger);

// 3. User Resource Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Root informational endpoint
app.get("/", (req, res) => {
  res.send("Week 5 Day 4: Express REST API is active! Visit /users");
});

// Endpoint to simulate an error for testing error-handling middleware
app.get("/trigger-error", (req, res, next) => {
  next(new Error("Simulated backend crash"));
});

// 4. Error Handling Middleware (Last middleware - MUST have 4 parameters)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Server listener
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
