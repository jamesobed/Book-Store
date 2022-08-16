import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { BookInstance } from "./book";

interface AuthorAttributes {
  id: string;
  author: string;
  age: number;
  email: string;
  password: string;
  address: string;
}

export class AuthorInstance extends Model<AuthorAttributes> {}

AuthorInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    // books: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: false,
    // },
  },
  {
    sequelize: db,
    tableName: "Authors",
  }
);

AuthorInstance.hasMany(BookInstance, { foreignKey: "authorsID", as: "Books" });

BookInstance.belongsTo(AuthorInstance, {
  foreignKey: "authorsID",
  as: "Authors",
});
