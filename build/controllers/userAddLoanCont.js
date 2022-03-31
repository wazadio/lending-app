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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addLoan_1 = require("../services/addLoan");
const addLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, jumlah } = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        jumlah: joi_1.default.number().required()
    });
    const validationResult = schema.validate({
        email: email,
        jumlah: jumlah
    });
    if (validationResult.error) {
        return res.status(400).json(validationResult);
    }
    (0, addLoan_1.addLoanService)(req, res);
});
exports.default = { addLoan };
