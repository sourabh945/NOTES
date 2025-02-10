// this middleware for checking the token and user authentication
//

const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(new AppError("Token is required", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Invalid Token", 401));
  }
};

module.exports = authenticate;
