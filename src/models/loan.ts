import { DataTypes } from "sequelize";
import { sequelize } from "../db"

export const LoanModel = sequelize.define('loans', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  jumlah: {
      type: DataTypes.FLOAT
  },
  user_id: {
      type: DataTypes.INTEGER
  }
});

