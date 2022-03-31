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
const showAllLoans_1 = require("../services/showAllLoans");
const showLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required()
    });
    const validationResult = schema.validate({
        email: email,
    });
    if (validationResult.error) {
        return res.status(400).json(validationResult);
    }
    (0, showAllLoans_1.showAllLoansService)(req, res);
});
exports.default = { showLoans };
