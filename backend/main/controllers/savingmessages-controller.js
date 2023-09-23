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
exports.getMessages = exports.sendMessgaes = void 0;
const messages_1 = __importDefault(require("../models/messages"));
function sendMessgaes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.user);
            const message = yield messages_1.default.create({
                Name: req.user.Name,
                Email: req.user.Email,
                userId: req.user.id,
                Message: req.body.message,
            });
            if (message) {
                res.status(200).json({ success: true, data: message });
            }
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    });
}
exports.sendMessgaes = sendMessgaes;
function getMessages(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = req.query.lastid;
            if (query == "undefined") {
                query = 0;
            }
            else {
                query = Number(req.query.lastid.trim());
            }
            console.log(req.query);
            console.log(query, "<<<<<<<<<<");
            const message = yield messages_1.default.findAll({ offset: query });
            if (message) {
                res.json({ success: true, data: message });
            }
        }
        catch (err) {
            res.json({ success: true, data: err });
            console.log(err);
        }
    });
}
exports.getMessages = getMessages;
