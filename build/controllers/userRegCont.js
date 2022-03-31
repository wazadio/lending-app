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
const registration_1 = require("../services/registration");
const registerCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, religion } = req.body;
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        religion: joi_1.default.string().required()
    });
    const validationResult = schema.validate({
        email: email,
        password: password,
        name: name,
        religion: religion
    });
    if (validationResult.error) {
        return res.status(400).json(validationResult);
    }
    (0, registration_1.registerService)(req, res);
});
exports.default = { registerCtrl };
