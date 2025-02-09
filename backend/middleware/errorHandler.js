const AppError = require("../utils/AppError");
const logger = require("../utils/logging");

module.exports = (err, req, res, next) => {
  //
  const statusCode = err.statusCode || 500;
  if (statusCode === 500) {
    logger.error(`${err}`);
  }
  const msg = err.isOperational ? err.message : "Internal Server Error";
  logger.error(`${msg}`);
  res.status(statusCode).json({ message: msg });
};
