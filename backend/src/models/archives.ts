import sequelize from "../util/db";
import { Sequelize, DataTypes } from "sequelize";

const Messages = sequelize.define("messagesArchive", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
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
  IsImage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

});

export default Messages;
