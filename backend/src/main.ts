import express from "express";
import bodyParser from "body-parser";
import { Server, Socket } from "socket.io";
import http from "http";
import path from "path";
import { CronJob } from "cron";
import sequelize from "./util/db"
/*routes*/
import loginsignuprouter from "./routes/loginsignup";
import messagesrouter from "./routes/messages";
import grouprouter from "./routes/group";
import imagesrouter from "./routes/images";
/*routes*/

import env from "dotenv";
import cors from "cors";

/* models */
import User from "./models/userTable";
import Messages from "./models/messages";
import Groups from "./models/groups";
import archiveMessage from "./models/archives"

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


const job = new CronJob("59 23 * * * *", ()=>{
 

    console.log("aa gaaya bhai me aandar")
   sequelize.query("INSERT INTO messagesArchives SELECT * FROM messages").then((res)=>{
    Messages.destroy({
      where: {},
      truncate: false // This option resets the auto-increment primary key (if applicable)
    }).then((ress)=>{
      console.log("successfully destroyed everything")
    });
   }).catch((err)=>{
    console.log(err, "there is some problem inside the job funciton")
   })
  }) 

job.start()

app.use(loginsignuprouter);
app.use(messagesrouter);
app.use(grouprouter);
app.use(imagesrouter);
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
  socket.on("messageSent", (obj) => {
    console.log(obj);
    io.to(obj.groupId).emit("takeMessage", obj);
  });
  socket.on("leave", (groupId: string) => {
    socket.leave(groupId);
    console.log(socket.eventNames);
    console.log("I left, group", groupId);
  });
  console.log(`the client is been connected ${socket.id}`);
});

Groups.belongsToMany(User, { through: "groupuser" });
User.belongsToMany(Groups, { through: "groupuser" });
User.hasMany(Messages);
Groups.hasMany(Messages);
User.hasMany(archiveMessage)
Groups.hasMany(archiveMessage)
db.sync().then(() => {
  server.listen(4000);
});
