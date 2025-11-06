import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json("token is required");
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (error) {
    res.status(401).json("invalid token");
  }
  //   console.log(token);
};

export default verifyToken;
