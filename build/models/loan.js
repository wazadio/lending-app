"use strict";
// import { Table, Column, Model, HasMany } from 'sequelize-typescript'
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanModel = void 0;
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
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.LoanModel = db_1.sequelize.define('loans', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    jumlah: {
        type: sequelize_1.DataTypes.FLOAT
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
