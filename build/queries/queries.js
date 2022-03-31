"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLoans = exports.createLoan = exports.createUser = exports.findUser = void 0;
const user_1 = require("../models/user");
const loan_1 = require("../models/loan");
require("../models/association/association");
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_1.UserModel.findOne({
        where: {
            email
        }
    });
    return result;
});
exports.findUser = findUser;
const createUser = (name, email, password, religion) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_1.UserModel.create({
        name,
        email,
        password,
        religion
    });
    return result;
});
exports.createUser = createUser;
const createLoan = (user_id, jumlah) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loan_1.LoanModel.create({
        user_id,
        jumlah
    });
    return result;
});
exports.createLoan = createLoan;
const getAllLoans = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loan_1.LoanModel.findAll({
        where: {
            user_id
        }
    });
    return result;
});
exports.getAllLoans = getAllLoans;
