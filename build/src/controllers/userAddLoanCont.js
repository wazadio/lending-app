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
const db = require("../../models");
const addLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, jumlah } = req.body;
    const user = yield db.user.findOne({
        where: {
            email: email
        }
    });
    const id = user.id;
    const loan = yield db.Loan.create({
        user_id: id, jumlah
    });
    return res.status(201).json({
        "status": "succes",
        "message": "loan added",
        "data": loan
    });
});
exports.default = { addLoan };
