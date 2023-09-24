import express from "express";
import bodyParser from "body-parser";

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
console.log("come here as well");
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use(loginsignuprouter);
app.use(messagesrouter);
app.use(grouprouter);

Groups.belongsToMany(User, { through: "groupuser" });
User.hasMany(Messages);
db.sync().then(() => {
  app.listen(4000);
});
