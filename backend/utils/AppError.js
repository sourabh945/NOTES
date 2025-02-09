// this the custom error class for handleing the error
// and make sure that only operational errors are returned
//
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 520;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // 4xx for client error and 5xx for server error
    this.isOperational = true; // Make sure that error as safe
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
