// Week 5 - Day 4 - Task 2: Custom Logger Middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Always call next() to prevent the request from hanging!
};

module.exports = logger;
