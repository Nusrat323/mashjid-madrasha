
import { Router } from "express";

import {
  verifyToken,
  protect,
  adminOnly,
  superAdminOnly,
} from "../middleware/auth.js";

import {
  syncUser,
  updateMe,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";


const router = Router();


/*
  Firebase login/register-এর পরে
  MongoDB user sync
*/
router.post(
  "/sync",
  verifyToken,
  syncUser
);


/*
  নিজের profile update
*/
router.patch(
  "/me",
  ...protect,
  updateMe
);


/*
  সব registered users দেখা

  যেকোনো admin দেখতে পারবে।
*/
router.get(
  "/",
  ...protect,
  adminOnly,
  getUsers
);


/*
  User delete

  শুধুমাত্র ADMIN_EMAIL account
  এই route access করতে পারবে।
*/
router.delete(
  "/:id",
  ...protect,
  superAdminOnly,
  deleteUser
);


export default router;


