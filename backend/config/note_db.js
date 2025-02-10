// this file is for connecting to the database
// i use mongodb for the note database

const mongoose = require("mongoose");
const logger = require("../utils/logging");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.note_DB_ConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
