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
exports.uploadMessageImage = exports.updateGroupImage = exports.uploadGroupImage = exports.updateProfileImage = exports.uploadProfileImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const groups_1 = __importDefault(require("../models/groups"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const region = "us-east-1";
const bucketName = "chat.app.project/";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new aws_sdk_1.default.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});
function uploadProfileImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const image = "user-" + req.user.id;
            const param = {
                Bucket: bucketName + "userProfile",
                Key: image,
                Expires: 60,
            };
            const uploadUrl = yield s3.getSignedUrlPromise("putObject", param);
            res.json(uploadUrl);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.uploadProfileImage = uploadProfileImage;
function updateProfileImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resp = yield req.user.update({ ProfileImageUrl: req.body.url });
            if (res) {
                res.status(200).json({ resp });
            }
        }
        catch (err) {
            res.status(500).json({ err });
        }
    });
}
exports.updateProfileImage = updateProfileImage;
function uploadGroupImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.query);
            const image = "group-" + req.query.id;
            const param = {
                Bucket: bucketName + "groupProfile",
                Key: image,
                Expires: 60,
            };
            const uploadUrl = yield s3.getSignedUrlPromise("putObject", param);
            res.json(uploadUrl);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.uploadGroupImage = uploadGroupImage;
function updateGroupImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resp = (yield groups_1.default.findOne({
                where: { id: req.query.id },
            }));
            console.log(resp, "<<resp>>");
            console.log(req.query, req.body);
            const update = yield resp.update({ Image: req.body.url });
            console.log(update, "<<>><<>><<>><<>>");
            if (update) {
                res.status(200).json({ update });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    });
}
exports.updateGroupImage = updateGroupImage;
function uploadMessageImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = crypto_1.default.randomUUID();
            console.log(req.query);
            const image = "message-" + uuid;
            const param = {
                Bucket: bucketName + "Messages",
                Key: image,
                Expires: 60,
            };
            const uploadUrl = yield s3.getSignedUrlPromise("putObject", param);
            res.json(uploadUrl);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.uploadMessageImage = uploadMessageImage;
