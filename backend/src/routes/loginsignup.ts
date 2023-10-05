import { Router } from "express";
import { login, signup, getUser } from "../controllers/loginsignup-control";
import { authenticate } from "../middlewears/authentication";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user", authenticate, getUser);
export default router;
