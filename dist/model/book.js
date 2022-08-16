"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class BookInstance extends sequelize_1.Model {
}
exports.BookInstance = BookInstance;
BookInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    authorsID: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
    },
    isPublished: {
        type: sequelize_1.DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
    },
    serialNumber: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: false,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "Books",
});
