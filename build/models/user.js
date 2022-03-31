"use strict";
// import { Table, Column, Model, HasMany } from 'sequelize-typescript'
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// @Table({
//     timestamps: true,
//     modelName: "user"
// })
// export default class User extends Model {
//   @Column
//   name!: string
//   @Column
//   email!: string
//   @Column
//   password!: string
//   @Column
//   religion!: string
// }
// import { Model } from "sequelize";
// module.exports = (sequelize: any, DataTypes: any) => {
//   class user extends Model {
//     static associate(models: any) {
//       // define association here
//       this.hasMany(models.Loan, {
//         foreignKey: "user_id"
//       })
//     }
//   }
//   user.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     religion: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'user',
//   });
//   return user;
// };
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.UserModel = db_1.sequelize.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    religion: {
        type: sequelize_1.DataTypes.STRING
    }
});
