"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const loanController_1 = __importDefault(require("../controllers/loanController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/borrower/registration', userController_1.default.userRegister);
router.post('/login', userController_1.default.userLogin);
router.post("/add", auth_1.auth, loanController_1.default.addLoan);
router.post("/getLoans", auth_1.auth, loanController_1.default.showLoans);
module.exports = router;
