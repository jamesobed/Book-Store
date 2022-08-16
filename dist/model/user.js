"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const book_1 = require("./book");
class AuthorInstance extends sequelize_1.Model {
}
exports.AuthorInstance = AuthorInstance;
AuthorInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        defaultValue: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
    },
    // books: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: false,
    // },
}, {
    sequelize: database_config_1.default,
    tableName: "Authors",
});
AuthorInstance.hasMany(book_1.BookInstance, { foreignKey: "authorsID", as: "Books" });
book_1.BookInstance.belongsTo(AuthorInstance, {
    foreignKey: "authorsID",
    as: "Authors",
});
