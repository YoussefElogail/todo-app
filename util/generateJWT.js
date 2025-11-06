import jwt from "jsonwebtoken";
const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export default generateJWT;
