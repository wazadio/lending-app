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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegMidd = void 0;
const db = require("../../models");
const EmailValidator = __importStar(require("email-validator"));
const isDataComplete = (email, name, password, religion) => {
    const lengkap = name != undefined && email != undefined && password != undefined && religion != undefined;
    if (lengkap) {
        return [true, ""];
    }
    else {
        let pesan = "";
        if (name == undefined) {
            pesan += "name,";
        }
        if (email == undefined) {
            pesan += "email,";
        }
        if (password == undefined) {
            pesan += "password,";
        }
        if (religion == undefined) {
            pesan += "religion,";
        }
        return [false, pesan += " tidak boleh kosong"];
    }
};
const isEmailValid = (email) => {
    if (EmailValidator.validate(email) == false) {
        console.log("email not valid");
        return false;
    }
    return true;
};
const isRegistered = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.user.findOne({ where: { email: email } });
    if (user !== null) {
        return true;
    }
    else {
        return false;
    }
});
const userRegMidd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, religion } = req.body;
    let message;
    const dataComplete = isDataComplete(email, name, password, religion);
    if (dataComplete[0]) {
        console.log(1);
        if (isEmailValid(email)) {
            console.log(2);
            const registered = yield isRegistered(email);
            if (registered) {
                console.log(3);
                message = {
                    "status": "failed",
                    "message": "email already registered"
                };
            }
            else {
                return next();
            }
        }
        else {
            console.log(4);
            message = {
                "status": "failed",
                "message": "email not valid"
            };
        }
    }
    else {
        console.log(5);
        message = {
            "status": "failed",
            "message": dataComplete[1]
        };
    }
    return res.status(400).json(message);
});
exports.userRegMidd = userRegMidd;
