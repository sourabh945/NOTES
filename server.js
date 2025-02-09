// this is the server that file run all the files
// author : sourabh945 <sheokand.sourabh.anil@gmail.com> <github.com/sourabh945>
//
require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// middleware
//
const upload = require("./backend/middleware/upload");

app.use(express.json());
app.use(upload);

// routes
app.use("/api/v1/auth", require("./backend/routes/auth"));

// databse connection
const userDB = require("./backend/config/user_db");

// error handler middleware
app.use(require("./backend/middleware/errorHandler"));

app.listen(PORT, async () => {
  console.log(`server is running on http://localhost:${PORT}`);
  try {
    await userDB.sync();
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection failed");
    console.log(err);
    process.exit(1);
  }
});
