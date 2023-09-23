"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const loginsignup_1 = __importDefault(require("./routes/loginsignup"));
const messages_1 = __importDefault(require("./routes/messages"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
/* models */
const userTable_1 = __importDefault(require("./models/userTable"));
const messages_2 = __importDefault(require("./models/messages"));
/* models */
const db_1 = __importDefault(require("./util/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
console.log("come here as well");
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(body_parser_1.default.json());
app.use(loginsignup_1.default);
app.use(messages_1.default);
userTable_1.default.hasMany(messages_2.default);
db_1.default.sync().then(() => {
    app.listen(4000);
});
