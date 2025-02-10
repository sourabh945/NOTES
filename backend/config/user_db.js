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

module.exports = userSequelize;
