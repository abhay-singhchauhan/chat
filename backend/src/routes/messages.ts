import { Router } from "express";
import { authenticate } from "../middlewears/authentication";
import {
  sendMessgaes,
  getMessages,
} from "../controllers/savingmessages-controller";

const app = Router();
app.post("/send-message", authenticate, sendMessgaes);
app.get("/get-messages", authenticate, getMessages);

export default app;
