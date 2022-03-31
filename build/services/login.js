"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis = __importStar(require("redis"));
const queries = __importStar(require("../queries/queries"));
const loginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield queries.findUser(email);
    console.log(user);
    if (user) {
        // const validation = await bcrypt.compare(password, user.password)
        const verified = bcrypt_1.default.compareSync(password, user.toJSON().password);
        console.log(verified);
        if (verified) {
            const token = jsonwebtoken_1.default.sign({
                id: user.toJSON().id,
                email: user.toJSON().email,
                name: user.toJSON().name,
                religion: user.toJSON().religion
            }, "pinjam_modal");
            const red_client = redis.createClient();
            red_client.connect();
            red_client.on('connect', function () {
                console.log('Connected!');
            });
            red_client.set(user.toJSON().email, token);
            // red_client.disconnect()
            return res.status(200).json({
                "status": "succes",
                "email": user.toJSON().email,
                "name": user.toJSON().name,
                "token": token
            });
        }
    }
    return res.status(400).json({
        "status": "failed",
        "message": "Invalid Credential"
    });
});
exports.loginService = loginService;
