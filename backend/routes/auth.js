// this file hold the logic for the authentication and generation of jwt for the usre
// this file is holding the login and signup api ends
const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const logger = require("../utils/logging");
const generateJWTSecret = require("../utils/keyGenerator");

// there the jwt key
//
const JWT_SECRET = process.env.JWT_SECRET || generateJWTSecret();

const router = express.Router();

// this function is for register the user
router.post(
  "/register",
  [
    body("username")
      .isAlphanumeric()
      .withMessage("Username is not valid, it must be a alphanumeric"),
    body("email").isEmail().withMessage("Email is not Valid"),
    body("name")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Name is not Valid"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one digit")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character"),
  ],
  catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (let error in errors.array()) {
        throw new AppError(error.toString(), 400);
      }
    }
    const { username, email, name, password } = req.body;
    if (!username || !email || !name || !password) {
      throw new AppError(
        "All required parameter for register is not given",
        400,
      );
    }
    try {
      const user = await User.create({ username, email, name, password });
      res.status(201).json({ message: "User Registered", user: user });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw new AppError(err.errors[0].message, 409);
      }
      throw new Error(err);
    }
  }),
);

// this function is for login the user
// this function will check the user with password and generate the jwt token for the user
router.post(
  "/login",
  [
    body("identifier").isAlphanumeric().withMessage("Username is not valid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (let error in errors.array()) {
        throw new AppError(error.toString(), 400);
      }
    }
    const { identifier, password } = req.body;
    if (!username || !password) {
      throw new AppError("Username/email and Password is required", 400);
    }
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });
    if (!user) {
      throw new AppError("User Not Found", 404);
    }
    if (!(await user.correctPassword(password, user.password))) {
      throw new AppError("Invalid Password", 401);
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
    res.status(200).json({ message: "User Logged In", token });
  }),
);

module.exports = router;
