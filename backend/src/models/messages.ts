import sequelize from "../util/db";
import { Sequelize, DataTypes } from "sequelize";

const Messages = sequelize.define("messages", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Messages;
