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
exports.removeGroupMember = exports.findGroupMembers = exports.getUsers = exports.getGroups = exports.addMember = exports.createGroup = void 0;
const groups_1 = __importDefault(require("../models/groups"));
const userTable_1 = __importDefault(require("../models/userTable"));
const groupuser_1 = __importDefault(require("../models/groupuser"));
const sequelize_1 = __importDefault(require("sequelize"));
function createGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            console.log(body);
            const group = yield groups_1.default.create({
                Name: body.name,
                Admin: req.user.id,
            });
            const addMember = yield groupuser_1.default.create({
                groupId: group.id,
                userId: req.user.id,
                groupName: group.Name,
            });
            res.json({ success: true });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    });
}
exports.createGroup = createGroup;
function addMember(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = req.query.groupId;
            const body = req.body;
            console.log(query, body);
            const user = yield userTable_1.default.findOne({ where: { Email: body.email } });
            const group = yield groups_1.default.findOne({ where: { id: query } });
            console.log(group);
            console.log(user);
            const addMember = yield groupuser_1.default.create({
                userId: user.id,
                groupId: group.id,
                groupName: group.Name,
            });
            res.json({ success: true });
        }
        catch (err) {
            res.json({ success: false });
        }
    });
}
exports.addMember = addMember;
function getGroups(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groups = yield groupuser_1.default.findAll({ where: { userId: req.user.id } });
            res.json({ groups });
        }
        catch (err) {
            console.log(err);
            res.json({ message: false });
        }
    });
}
exports.getGroups = getGroups;
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = req.query;
            const user = yield userTable_1.default.findAll({
                where: { email: { [sequelize_1.default.Op.like]: `%${query.email}%` } },
            });
            console.log(user);
            if (user.length > 0) {
                res.status(200).json({ data: user });
            }
            else {
                res.status(200).json({ data: null });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ data: null });
        }
    });
}
exports.getUsers = getUsers;
function findGroupMembers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const obj = {
            include: {
                model: userTable_1.default,
                through: groupuser_1.default,
            },
        };
        try {
            const query = req.query;
            const group = (yield groups_1.default.findByPk(query.groupId, obj));
            res.status(200).json(group.users);
            console.log(group);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false });
        }
    });
}
exports.findGroupMembers = findGroupMembers;
function removeGroupMember(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = req.query;
            console.log(query, "<<<<<<<<");
            const gu = yield groupuser_1.default.destroy({
                where: { groupId: query.groupId, userId: query.userId },
            });
            if (gu) {
                res.status(200).json({ data: gu, success: true });
            }
        }
        catch (err) {
            console.log(err);
            res.status(200).json({ success: false });
        }
    });
}
exports.removeGroupMember = removeGroupMember;
