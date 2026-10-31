// Week 5 - Day 5: Error Handling Middleware
module.exports = (err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
};
