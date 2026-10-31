// Week 5 - Day 5: Custom Logger Utility
module.exports = (req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url} at ${new Date().toLocaleString()}`);
  next();
};
