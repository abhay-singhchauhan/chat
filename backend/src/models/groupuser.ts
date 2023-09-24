import sequelize from "../util/db";
import { Sequelize, DataTypes } from "sequelize";

const groupuser = sequelize.define("groupuser", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default groupuser;
