// this the custom error class for handleing the error
// and make sure that only operational errors are returned
//
class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    this.isOperational = true; // Make sure that error as safe
  }
}

module.export = AppError;
