"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../util/db"));
const sequelize_1 = require("sequelize");
const Messages = db_1.default.define("messagesArchive", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    IsImage: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
});
exports.default = Messages;
