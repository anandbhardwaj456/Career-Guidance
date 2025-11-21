function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLine = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    console.log(logLine);
  });

  next();
}

module.exports = requestLogger;
