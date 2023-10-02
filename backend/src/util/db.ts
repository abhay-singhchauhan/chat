import { Sequelize } from "sequelize";
import env from "dotenv";
env.config()
const sequelize = new Sequelize("chat-app", "root", "Snjay@66", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
