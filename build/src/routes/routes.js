"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userRegCont_1 = __importDefault(require("../controllers/userRegCont"));
const userLogCont_1 = __importDefault(require("../controllers/userLogCont"));
const userAddLoanCont_1 = __importDefault(require("../controllers/userAddLoanCont"));
const userShowLoansConst_1 = __importDefault(require("../controllers/userShowLoansConst"));
const userRegMidd_1 = require("../middlewares/userRegMidd");
const userAddLoanMidd_1 = require("../middlewares/userAddLoanMidd");
const userShowLoansMidd_1 = require("../middlewares/userShowLoansMidd");
const router = express_1.default.Router();
router.post('/borrower/registration', userRegMidd_1.userRegMidd, userRegCont_1.default.register);
router.post('/login', userLogCont_1.default.login);
router.post("/add", userAddLoanMidd_1.userAddLoanMidd, userAddLoanCont_1.default.addLoan);
router.post("/getLoans", userShowLoansMidd_1.userShowLoansMidd, userShowLoansConst_1.default.showLoans);
module.exports = router;