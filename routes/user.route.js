import { Router } from "express";
import {
  createUser,
  getUsers,
  login,
  getMyData,
  uploadImage,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import multer from "multer";

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("FILE", file);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];

  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb("error", false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

const router = Router();

router.route("/").get(getUsers);
// router.route("/id").get();
router.route("/register").post(createUser);
router
  .route("/upload_image")
  .patch(verifyToken, upload.single("image"), uploadImage);
router.route("/login").post(login);
router.route("/get_my_data").get(verifyToken, getMyData);

export default router;
