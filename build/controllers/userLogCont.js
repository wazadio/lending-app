"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const login_1 = require("../services/login");
const loginCtrl = (req, res) => {
    const { email, password } = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    });
    const validationResult = schema.validate({
        email: email,
        password: password
    });
    if (validationResult.error) {
        return res.status(400).json(validationResult);
    }
    (0, login_1.loginService)(req, res);
};
exports.default = { loginCtrl };
