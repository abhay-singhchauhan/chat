import express from "express";
import bodyParser from "body-parser";
import loginsignuprouter from "./routes/loginsignup";
import messagesrouter from "./routes/messages";
import env from "dotenv";
import cors from "cors";

/* models */
import User from "./models/userTable";
import Messages from "./models/messages";
/* models */

import db from "./util/db";

env.config();
const app = express();
console.log("come here as well");
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use(loginsignuprouter);
app.use(messagesrouter);

User.hasMany(Messages);
db.sync().then(() => {
  app.listen(4000);
});
