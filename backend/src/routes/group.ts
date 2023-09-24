import { Router } from "express";
import {
  createGroup,
  addMember,
  getGroups,
} from "../controllers/group-controls";
import { authenticate } from "../middlewears/authentication";

const router = Router();

router.post("/create-group", authenticate, createGroup);
router.post("/add-member", authenticate, addMember);
router.get("/get-groups", authenticate, getGroups);

export default router;
