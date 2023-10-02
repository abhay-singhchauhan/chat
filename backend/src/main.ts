import express from "express";
import bodyParser from "body-parser";
import { Server, Socket } from "socket.io";
import http from "http";
import path from "path";
/*routes*/
import loginsignuprouter from "./routes/loginsignup";
import messagesrouter from "./routes/messages";
import grouprouter from "./routes/group";
/*routes*/

import env from "dotenv";
import cors from "cors";

/* models */
import User from "./models/userTable";
import Messages from "./models/messages";
import Groups from "./models/groups";
/* models */

import db from "./util/db";

env.config();
const app = express();
const server = http.createServer(app);

console.log("come here as well");
app.use(
  cors({
    origin: "*",
  })
);
console.log("hi here");
app.use(bodyParser.json());

app.use(loginsignuprouter);
app.use(messagesrouter);
app.use(grouprouter);
app.use((req: any, res: any, next: any) => {
  res.sendFile(path.join(__dirname, req.url));
  console.log(req.url);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("joinChat", (roomNumber: string, memberName: string) => {
    console.log(roomNumber, memberName);
    socket.join(roomNumber);
    io.to(roomNumber).emit("joinedRoom", memberName);
  });
  socket.on("messageSent", (groupId, messageValue) => {
    io.to(groupId).emit("takeMessage", messageValue, groupId);
  });
  console.log(`the client is been connected ${socket.id}`);
});

Groups.belongsToMany(User, { through: "groupuser" });
User.belongsToMany(Groups, { through: "groupuser" });
User.hasMany(Messages);
db.sync().then(() => {
  server.listen(4000);
});
