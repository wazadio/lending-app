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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = require("../../models");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, religion } = req.body;
    const passwordHash = bcrypt_1.default.hashSync(password, 6);
    console.log("PASSWORD = ", passwordHash);
    // password = passwordHash
    yield db.user.create({
        name, email, password: passwordHash, religion
    });
    return res.status(201).json({
        "status": "succes",
        "message": "Regitration succesfully"
    });
});
exports.default = { register };
