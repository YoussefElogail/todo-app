import { Router } from "express";
import { createUser, getUsers, login } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(getUsers);
// router.route("/id").get();
router.route("/register").post(createUser);
router.route("/login").post(login);

export default router;
