import { Router } from "express";
import { verifyToken, protect, adminOnly } from "../middleware/auth.js";
import { syncUser, updateMe, getUsers, updateRole } from "../controllers/userController.js";

const router = Router();

router.post("/sync", verifyToken, syncUser);
router.patch("/me", ...protect, updateMe);
router.get("/", ...protect, adminOnly, getUsers);
router.patch("/:id/role", ...protect, adminOnly, updateRole);

export default router;
