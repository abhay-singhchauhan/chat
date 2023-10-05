import sequelize from "../util/db";
import { Sequelize, DataTypes } from "sequelize";

const User = sequelize.define("user", {
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
  Phone: {
    allowNull: false,
    type: DataTypes.BIGINT,
  },
  Password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ProfileImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default User;
