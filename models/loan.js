'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "user_id"
      })
    }
  }
  Loan.init({
    user_id: DataTypes.INTEGER,
    jumlah: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};