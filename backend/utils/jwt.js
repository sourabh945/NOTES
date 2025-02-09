// this file hold the function for the jwt generation
//

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateJWTSecret() {
  return crypto.randomBytes(64).toString("hex");
}

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = generateJWTSecret();
}

function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT || "1d",
  });
}

module.exports = generateJWT;
