import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateJWT from "../util/generateJWT.js";

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

const createUser = asyncWrapper(async (req, res) => {
  const body = req.body;
  const hashedPss = await bcrypt.hash(body.password, 10);
  const newUser = new User({
    name: body.name,
    email: body.email,
    password: hashedPss,
  });
  const token = generateJWT({
    name: newUser.name,
    email: newUser.email,
    id: newUser._id,
  });
  newUser.token = token;
  await newUser.save();
  res.status(200).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

const login = asyncWrapper(async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  let matchedPass = false;
  if (user) {
    matchedPass = await bcrypt.compare(body.password, user.password);
  } else {
    res.status(400).json("error");
  }
  if (user && matchedPass) {
    const token = generateJWT({
      name: user.name,
      email: user.email,
      id: user._id,
    });
    return res.status(200).json({
      status: "SUCCESS",
      data: { token },
    });
  } else {
    res.status(400).json("error");
  }
});

export { getUsers, createUser, login };
