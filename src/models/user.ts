// import { Table, Column, Model, HasMany } from 'sequelize-typescript'

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
import { DataTypes } from "sequelize";
import { sequelize } from "../db"
import { LoanModel } from "./loan";

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
