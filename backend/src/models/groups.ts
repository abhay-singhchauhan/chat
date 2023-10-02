import sequelize from "../util/db";
import { Sequelize, DataTypes } from "sequelize";

const Groups = sequelize.define("groups", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Admin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Heading: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Groups;
