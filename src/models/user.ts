import { DataTypes } from "sequelize";
import { sequelize } from "../db"

export const UserModel = sequelize.define('users', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  religion: {
    type: DataTypes.STRING
  }
});
