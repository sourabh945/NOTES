const AppError = require("../utils/AppError");
const logger = require("../utils/logging");

module.exports = (err, req, res, next) => {
  //
  const statusCode = err.statusCode || 500;
  if (statusCode === 500) {
    logger.error(`${err}`);
  }
  const msg = err.isOperational ? err.msg : "Internal Server Error";

  res.status(statusCode).json({ message: msg });
};
