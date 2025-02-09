// this function is for connect the databases requireds
//

// user-db connection: I use postgresql ( in dev env )
//
const { Sequelize } = require("sequelize");
const logger = require("../utils/logging");

const userSequelize = new Sequelize(
  process.env.user_DB_NAME,
  process.env.user_DB_USER,
  process.env.user_DB_PASS,
  {
    host: process.env.user_DB_HOST,
    port: process.env.user_DB_PORT,
    dialect: "postgres",
  },
);

// checking trying to connect to the database
// if unable to connect then shutdown the server
(async () => {
  logger.info("Test for connecting to the user database...");
  try {
    await userSequelize.authenticate();
    logger.info("Successfully pass the connection test for user database");
  } catch (err) {
    logger.error(`Unable to Connect to the user database due to error ${err}`);
    process.exit(1);
  }
})();

module.exports = userSequelize;
