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
const express_1 = __importDefault(require("express"));
const EmailValidator = __importStar(require("email-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis = __importStar(require("redis"));
const db = require("../models");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.response = {
            status: "",
            message: ""
        };
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("hi");
        });
        this.app.route("/borrower/registration").post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let { name, email, password, religion } = req.body;
            const cek = this.dataChecker(name, email, password, religion);
            if (cek == 0) {
                const user = yield db.user.findOne({ where: { email: email } });
                const user2 = yield db.user.findOne({ where: { email: email } });
                // console.log(user)
                // console.log(user2)
                if (user !== null) {
                    this.response = {
                        status: "failed",
                        message: "Email has been used"
                    };
                    return res.send(this.response);
                }
                const passwordHash = bcrypt_1.default.hashSync(password, 6);
                console.log("PASSWORD = ", passwordHash);
                // password = passwordHash
                const createUser = yield db.user.create({
                    name, email, password: passwordHash, religion
                });
                this.response = {
                    status: "succes",
                    message: "Register Successfully"
                };
                return res.send(this.response);
            }
            else {
                this.response = {
                    status: "failed",
                    message: cek
                };
                return res.send(this.response);
            }
        }));
        this.app.route("/login").post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let { email, password } = req.body;
            if (email && password) {
                const user = yield db.user.findOne({
                    where: {
                        email: email
                    }
                });
                if (user) {
                    // const validation = await bcrypt.compare(password, user.password)
                    const verified = bcrypt_1.default.compareSync(password, user.password);
                    console.log(verified);
                    if (verified) {
                        const token = jsonwebtoken_1.default.sign({
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            religion: user.religion
                        }, "pinjam_modal");
                        const red_client = redis.createClient();
                        red_client.connect();
                        red_client.on('connect', function () {
                            console.log('Connected!');
                        });
                        red_client.set(user.email, token);
                        // red_client.disconnect()
                        return res.send({
                            "email": user.email,
                            "name": user.name,
                            "token": token
                        });
                    }
                }
                return res.send("User not found");
            }
            return res.send("Data kurang lengkap");
        }));
    }
    dataChecker(name, email, password, religion) {
        const lengkap = name != undefined && email != undefined && password != undefined && religion != undefined;
        if (lengkap) {
            if (EmailValidator.validate(email) == false) {
                console.log("email not valid");
                return "Email not valid";
            }
            return 0;
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
            return pesan += " tidak boleh kosong";
        }
    }
}
const port = 3000;
const app = new App().app;
app.listen(port, () => {
    console.log("started");
});
// const app = express()
// app.route("/").get((req, res) => {
//     res.send("hi")
// })
// app.listen(3000)
