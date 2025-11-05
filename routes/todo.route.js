import { Router } from "express";
import { createTodo, getTodos } from "../controllers/todo.controller.js";
export const router = Router();

router.route("/").get(getTodos).post(createTodo);
