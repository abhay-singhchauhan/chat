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
exports.removeGroupMember = exports.findGroupMembers = exports.getUsers = exports.getGroup = exports.getGroups = exports.addMember = exports.createGroup = void 0;
const groups_1 = __importDefault(require("../models/groups"));
const userTable_1 = __importDefault(require("../models/userTable"));
const groupuser_1 = __importDefault(require("../models/groupuser"));
const sequelize_1 = __importDefault(require("sequelize"));
function createGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            console.log(body, "idhar <<<<<");
            const group = yield groups_1.default.create({
                Name: body.name,
                Heading: body.heading,
                Admin: req.user.id,
            });
            const addMember = yield groupuser_1.default.create({
                groupId: group.id,
                userId: req.user.id,
                groupName: group.Name,
            });
            res.status(200).json({ success: true });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false });
        }
    });
}
exports.createGroup = createGroup;
function addMember(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = req.query.groupId;
            const body = req.body;
            console.log(query, body, " <<<<<<>>>>>>");
            const user = yield userTable_1.default.findOne({ where: { Email: body.email } });
            const group = yield groups_1.default.findOne({ where: { id: query } });
            if (group.Admin === req.user.id) {
                const addMember = yield groupuser_1.default.create({
                    userId: user.id,
                    groupId: group.id,
                    groupName: group.Name,
                });
                console.log(group.id);
                console.log(user.id);
                res.json({ success: true });
            }
            else {
                res.json({ success: false, message: "Only Admin can add members" });
            }
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
            const obj = {
                include: {
                    model: groups_1.default,
                    through: groupuser_1.default,
                },
            };
            const groups = yield userTable_1.default.findByPk(req.user.id, obj);
            console.log(groups);
            res.json({ success: true, groups, userDetails: req.user });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    });
}
exports.getGroups = getGroups;
function getGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const group = yield groups_1.default.findOne({ where: { id: body.id } });
            res.status(200).json({ group, success: true });
        }
        catch (err) {
            res.status(500).json({ group: null, success: true });
        }
    });
}
exports.getGroup = getGroup;
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = req.query;
            const user = yield userTable_1.default.findAll({
                where: { email: { [sequelize_1.default.Op.like]: `%${query.email}%` } },
            });
            console.log(user);
            if (user.length > 0) {
                res.status(200).json({ data: user, success: true, message: "done" });
            }
            else {
                res.status(200).json({ data: null, success: false });
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
            const group = (yield groups_1.default.findOne({
                where: { id: query.groupId },
            }));
            console.log(group);
            if (group.Admin === req.user.id) {
                const gu = yield groupuser_1.default.destroy({
                    where: { groupId: query.groupId, userId: query.userId },
                });
                if (gu) {
                    res.status(200).json({ data: gu, success: true });
                }
            }
            else {
                res
                    .status(200)
                    .json({ success: false, message: "Only Admin can Remove a User" });
            }
        }
        catch (err) {
            console.log(err);
            res.status(200).json({ success: false });
        }
    });
}
exports.removeGroupMember = removeGroupMember;
