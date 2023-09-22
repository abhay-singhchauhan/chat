"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginsignup_control_1 = require("../controllers/loginsignup-control");
const router = (0, express_1.Router)();
router.post("/signup", loginsignup_control_1.signup);
router.post("/login", loginsignup_control_1.login);
exports.default = router;
