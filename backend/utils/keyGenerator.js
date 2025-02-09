const crypto = require("crypto");

function generateJWTSecret() {
  return crypto.randomBytes(64).toString("hex");
}

module.exports = generateJWTSecret;
