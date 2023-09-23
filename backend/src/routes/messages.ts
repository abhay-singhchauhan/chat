import { Router } from "express";
import { authenticate } from "../middlewears/authentication";
import { sendMessgaes } from "../controllers/savingmessages-controller";

const app = Router();
app.post("/send-message", authenticate, sendMessgaes);

export default app;
