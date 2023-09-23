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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userTable_1 = __importDefault(require("../models/userTable"));
dotenv_1.default.config();
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("come till Auth");
        try {
            const key = process.env.JWT_KEY;
            const token = req.headers.token;
            const user = jsonwebtoken_1.default.verify(token, key);
            if (user) {
                const findUser = yield userTable_1.default.findOne({
                    where: { id: user.userId, Name: user.name, Email: user.email },
                });
                if (findUser) {
                    req.user = findUser;
                    console.log("found User id");
                    next();
                }
                else
                    res.send({ success: false, message: "user not found" });
            }
            else
                res.send({ success: false, message: "token not verified" });
        }
        catch (err) {
            console.log(err);
            res.send({ success: false, message: "its an error" });
        }
    });
}
exports.authenticate = authenticate;
