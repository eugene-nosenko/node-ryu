const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.error) {
    res.status(res.error.status || 400).json({
      error: true,
      message: res.error.message,
    });
  }
  if (res.data) {
    res.send(res.data);
  }
  next();
};

exports.responseMiddleware = responseMiddleware;
