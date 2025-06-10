import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/create", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
