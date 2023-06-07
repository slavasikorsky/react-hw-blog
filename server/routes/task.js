import express from "express";

import {
  getTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
} from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
