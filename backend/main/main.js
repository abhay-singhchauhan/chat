"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const loginsignup_1 = __importDefault(require("./routes/loginsignup"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./util/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(loginsignup_1.default);
db_1.default.sync().then(() => {
    app.listen(4000);
});
