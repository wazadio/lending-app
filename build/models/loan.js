"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanModel = void 0;
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
