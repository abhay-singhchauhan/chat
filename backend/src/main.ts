import express from "express";
import bodyParser from "body-parser";
import router from "./routes/loginsignup";
import env from "dotenv";
import db from "./util/db";
env.config();
const app = express();
app.use(bodyParser.json());

app.use(router);
db.sync().then(() => {
  app.listen(4000);
});
