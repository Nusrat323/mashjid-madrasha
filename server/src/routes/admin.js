import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import { getDashboard } from "../controllers/dashboardController.js";

const router = Router();

router.get("/dashboard", ...protect, adminOnly, getDashboard);

export default router;
