const dataType = require("sequelize");
const { sequelize_connection } = require("../config/db");

const schools = sequelize_connection.define(
  "schools",
  {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataType.TEXT,
      allowNull: false,
    },
    address: {
      type: dataType.TEXT,
      allowNull: false,
    },
    city: {
      type: dataType.TEXT,
      allowNull: false,
    },
    state: {
      type: dataType.TEXT,
      allowNull: false,
    },
    contact: {
      type: dataType.BIGINT,
      Unique: true,
      allowNull: false,
    },
    image: {
      type: dataType.TEXT,
      allowNull: true,
    },
    email_id: {
      type: dataType.TEXT,
      Unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  schools,
};
