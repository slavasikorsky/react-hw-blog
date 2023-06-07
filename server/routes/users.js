import express from "express";
import {
  login,
  registration,
  deleteUser,
  updateUserProfile,
  getUser,
  getUsers,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/registration", registration);
router.get("/list", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUserProfile);
router.delete("/:id", deleteUser);

export default router;
