"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../util/db"));
const sequelize_1 = require("sequelize");
const Groups = db_1.default.define("groups", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Admin: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Heading: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Image: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = Groups;
