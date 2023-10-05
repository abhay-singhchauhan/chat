"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
/*routes*/
const loginsignup_1 = __importDefault(require("./routes/loginsignup"));
const messages_1 = __importDefault(require("./routes/messages"));
const group_1 = __importDefault(require("./routes/group"));
const images_1 = __importDefault(require("./routes/images"));
/*routes*/
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
/* models */
const userTable_1 = __importDefault(require("./models/userTable"));
const messages_2 = __importDefault(require("./models/messages"));
const groups_1 = __importDefault(require("./models/groups"));
/* models */
const db_1 = __importDefault(require("./util/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
console.log("come here as well");
app.use((0, cors_1.default)({
    origin: "*",
}));
console.log("hi here");
app.use(body_parser_1.default.json());
app.use(loginsignup_1.default);
app.use(messages_1.default);
app.use(group_1.default);
app.use(images_1.default);
app.use((req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, req.url));
    console.log(req.url);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    socket.on("joinChat", (roomNumber, memberName) => {
        console.log(roomNumber, memberName);
        socket.join(roomNumber);
        io.to(roomNumber).emit("joinedRoom", memberName);
    });
    socket.on("messageSent", (obj) => {
        console.log(obj);
        io.to(obj.groupId).emit("takeMessage", obj);
    });
    socket.on("leave", (groupId) => {
        socket.leave(groupId);
        console.log(socket.eventNames);
        console.log("I left, group", groupId);
    });
    console.log(`the client is been connected ${socket.id}`);
});
groups_1.default.belongsToMany(userTable_1.default, { through: "groupuser" });
userTable_1.default.belongsToMany(groups_1.default, { through: "groupuser" });
userTable_1.default.hasMany(messages_2.default);
groups_1.default.hasMany(messages_2.default);
db_1.default.sync().then(() => {
    server.listen(4000);
});
