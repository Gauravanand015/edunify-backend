const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize_connection = new Sequelize(
  "schools",
  "root",
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = {
  sequelize_connection,
};
