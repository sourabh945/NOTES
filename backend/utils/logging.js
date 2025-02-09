// this file hold the logger function for the system
//

const winston = require("winston");

// getting the format type
const envType = process.env.ENV_TYPE || "production";
let formatType;
if (envType == "production") {
  formatType = winston.format.json(); // this is for producation logger processing applications
} else {
  formatType = winston.format.simple(); // this simple output for development
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({ format: formatType }), // logs print to console
    new winston.transports.File({ filename: "logs/all.log" }), // logs to file
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

module.exports = logger;
