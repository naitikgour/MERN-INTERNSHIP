module.exports = (err, req, res, next) => {
  console.error("Central Error Handler:", err.message);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};

