import { Router } from "express";
import {
  createGroup,
  addMember,
  getGroups,
  getUsers,
  findGroupMembers,
  removeGroupMember,
} from "../controllers/group-controls";
import { authenticate } from "../middlewears/authentication";

const router = Router();

router.post("/create-group", authenticate, createGroup);
router.post("/add-member", authenticate, addMember);
router.get("/get-groups", authenticate, getGroups);
router.get("/get-users", authenticate, getUsers);
router.get("/get-group-members", authenticate, findGroupMembers);
router.delete("/remove-group-member", authenticate, removeGroupMember);

export default router;
