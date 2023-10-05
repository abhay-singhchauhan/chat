import { Router } from "express";
import {
  uploadProfileImage,
  updateProfileImage,
  uploadGroupImage,
  updateGroupImage,
  uploadMessageImage,
} from "../controllers/images-controls";
import { authenticate } from "../middlewears/authentication";
const router = Router();

router.put("/upload-profile-image", authenticate, uploadProfileImage);
router.post("/update-profile-image", authenticate, updateProfileImage);
router.put("/upload-group-image", authenticate, uploadGroupImage);
router.post("/update-group-image", authenticate, updateGroupImage);
router.put("/upload-message-image", authenticate, uploadMessageImage);

export default router;
