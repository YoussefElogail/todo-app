import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  showTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(showTodo).patch(updateTodo).delete(deleteTodo);

export default router;
