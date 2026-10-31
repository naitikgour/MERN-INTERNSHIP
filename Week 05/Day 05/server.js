// Week 5 - Day 5: Scalable Express Server with Dotenv & Advanced Routing
require("dotenv").config();
const express = require("express");
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Custom logger from utils
const logger = require("./utils/logger");
app.use(logger);

// Mount modular routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Root health check endpoint
app.get("/", (req, res) => {
  res.json({
    app: process.env.APP_NAME || "ExpressTraining",
    message: "Week 5 Day 5: Advanced Routing API is live!",
    endpoints: [
      "GET /api/users",
      "POST /api/users",
      "GET /api/users/:id",
      "GET /api/users/:id/:section",
      "GET /api/users/:userId/orders/:orderId?status=pending"
    ]
  });
});

// Error simulation endpoint
app.get("/api/crash", (req, res, next) => {
  next(new Error("Test crash for central errorHandler middleware"));
});

// Error handling middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Get PORT from environment or fallback
const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [App: ${process.env.APP_NAME || 'ExpressTraining'}]`);
  });
}

module.exports = app;
