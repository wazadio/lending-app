"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const loan_1 = require("../loan");
user_1.UserModel.hasMany(loan_1.LoanModel, {
    foreignKey: "user_id"
});
loan_1.LoanModel.belongsTo(user_1.UserModel, {
    foreignKey: "user_id"
});
