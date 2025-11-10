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
  const user = new User({
    name: body.name,
    email: body.email,
    password: hashedPss,
  });
  const token = generateJWT({
    name: user.name,
    email: user.email,
    id: user._id,
  });
  user.token = token;
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
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
    user.token = token;
    return res.status(200).json({
      status: "SUCCESS",
      data: {
        user,
      },
    });
  } else {
    res.status(400).json("error");
  }
});

const uploadImage = asyncWrapper(async (req, res) => {
  const image = req.file.filename;
  const { currentUser } = req;

  // احذف exp و iat من الكائن
  const { exp, iat, ...safeUser } = currentUser;

  const token = generateJWT({
    ...safeUser,
    image: `${req.protocol}://localhost:4000/uploads/${image}`,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: {
        ...safeUser,
        image: `${req.protocol}://localhost:4000/uploads/${image}`,
        token,
      },
    },
  });
});

const getMyData = asyncWrapper(async (req, res) => {
  const { currentUser } = req;
  console.log(currentUser);
  res.status(200).json({
    status: "success",
    data: {
      currentUser,
    },
  });
});

export { getUsers, createUser, login, getMyData, uploadImage };
