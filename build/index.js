"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use("/", routes_1.default);
    }
}
const port = 3000;
const app = new App().app;
app.listen(port, () => {
    console.log("started");
});
