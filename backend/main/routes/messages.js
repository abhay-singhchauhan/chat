"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewears/authentication");
const savingmessages_controller_1 = require("../controllers/savingmessages-controller");
const app = (0, express_1.Router)();
app.post("/send-message", authentication_1.authenticate, savingmessages_controller_1.sendMessgaes);
app.get("/get-messages", authentication_1.authenticate, savingmessages_controller_1.getMessages);
exports.default = app;
