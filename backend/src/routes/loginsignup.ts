import { Router } from "express";
import { signup } from "../controllers/loginsignup-control";

const router = Router();

router.post("/signup", signup);

export default router;
