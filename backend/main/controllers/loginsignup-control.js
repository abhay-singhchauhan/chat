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
exports.login = exports.signup = void 0;
const userTable_1 = __importDefault(require("../models/userTable"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userTable_1.default.findAll({ where: { Email: req.body.email } });
            if (user.length < 1) {
                bcrypt_1.default.hash(req.body.password, 10, (err, hashed) => __awaiter(this, void 0, void 0, function* () {
                    const createdUser = yield userTable_1.default.create({
                        Name: req.body.name,
                        Email: req.body.email,
                        Password: hashed,
                        Phone: req.body.phone,
                    });
                    res.status(200).json({
                        data: createdUser,
                        message: "User Created Successfully, Please Login",
                    });
                }));
            }
            else {
                res.json({ data: null, message: "User Already Exists, Please Login" });
            }
        }
        catch (err) {
            res.status(500).json({ data: err, message: "Unexpected Error" });
        }
    });
}
exports.signup = signup;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const user = (yield userTable_1.default.findOne({ where: { email: body.email } }));
            if (user) {
                bcrypt_1.default.compare(body.password, user.Password, (err, hash) => {
                    if (hash) {
                        console.log("every thing is fine");
                        const obj = {
                            userId: user.id,
                            name: user.Name,
                            email: user.Email,
                        };
                        const token = jsonwebtoken_1.default.sign(obj, process.env.JWT_KEY);
                        if (token) {
                            res.status(200).json({
                                status: true,
                                message: "Login Successfull",
                                token: token,
                            });
                        }
                    }
                    else {
                        console.log("error hai");
                        res.status(401).json({ status: false, message: "Wrong Password" });
                    }
                });
            }
            else {
                res.status(404).json({ status: false, message: "User dosen't exist" });
            }
        }
        catch (err) {
            res.status(500).json({ status: false, message: "uncought error" });
        }
    });
}
exports.login = login;
