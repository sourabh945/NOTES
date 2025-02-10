// this is the server that file run all the files
// author : sourabh945 <sheokand.sourabh.anil@gmail.com> <github.com/sourabh945>
//
require("dotenv").config();
const express = require("express");
const app = express();

const logger = require("./backend/utils/logging");

const PORT = process.env.PORT || 3000;

// middleware
//
const cors = require("cors");
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/auth", require("./backend/routes/auth"));
app.use("/api/v1/notes", require("./backend/routes/notes"));

// databse connection
const userDB = require("./backend/config/user_db");
const noteDbConnect = require("./backend/config/note_db");

// error handler middleware
app.use(require("./backend/middleware/errorHandler"));

app.listen(PORT, async () => {
  logger.info("Applying change to User database...");
  await userDB
    .sync({ alter: true })
    .then(() => {
      logger.info("Successfully applyed all changes to User database");
    })
    .catch((err) => {
      logger.error("Error while applying changes to User database");
      logger.error(err);
      process.exit(1);
    });
  logger.info("Connecting to User database...");
  await userDB
    .authenticate()
    .then(() => {
      logger.info("Successfully connected to User database");
    })
    .catch((err) => {
      logger.error("Error while connecting to User database");
      logger.error(err);
      process.exit(1);
    });
  logger.info("Connecting to Note database...");
  await noteDbConnect()
    .then(() => {
      logger.info("Successfully applyed all changes to Note database");
    })
    .catch((err) => {
      logger.error("Error while applying changes to Note database");
      logger.error(err);
      process.exit(1);
    });
  console.log(`\n\nserver is running on http://localhost:${PORT}`);
});
