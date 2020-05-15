const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (req.data) {
    res.send(req.data);
  }
};

exports.responseMiddleware = responseMiddleware;
