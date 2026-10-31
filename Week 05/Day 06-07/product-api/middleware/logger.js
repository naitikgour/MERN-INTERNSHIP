// Product API Custom Logger Middleware
module.exports = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[API ${req.method}] ${req.originalUrl || req.url} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
};
