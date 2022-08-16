import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface BookAttributes {
  id: string;
  authorsID: string;
  name: string;
  isPublished: boolean;
  serialNumber: number;
}
export class BookInstance extends Model<BookAttributes> {}

BookInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    authorsID: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      primaryKey: false,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.NUMBER,
      primaryKey: false,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Books",
  }
);
