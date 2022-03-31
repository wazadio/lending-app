// import { Table, Column, Model, HasMany } from 'sequelize-typescript'

// @Table({
//     timestamps: true,
//     modelName: "user"
// })
// class Person extends Model {

//   @Column
//   email!: string

//   @Column
//   jumlah!: number

//   @Column
//   user_id!: number

// }

// import { Model } from "sequelize";
// module.exports = (sequelize: any, DataTypes: any) => {
//     class Loan extends Model {
//         static associate(models: any) {
//             // define association here
//             this.belongsTo(models.user, {
//                 foreignKey: "user_id"
//             })
//         }
//     }
//     Loan.init({
//         user_id: DataTypes.INTEGER,
//         jumlah: DataTypes.FLOAT
//     }, {
//         sequelize,
//         modelName: 'loan',
//     });
//     return Loan;
// };

import { DataTypes } from "sequelize";
import { sequelize } from "../db"
import { UserModel } from "./user";

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

