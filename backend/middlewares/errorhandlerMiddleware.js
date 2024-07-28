const { stack } = require("../routes/entrepreneur_router");

const errorhandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
  next();
};

module.exports = errorHandler;
