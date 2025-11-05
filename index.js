import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/todo.route.js";
const app = express();
dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.MONGO_URL;
mongoose.connect(dbUrl).then(() => {
  console.log("Connected to MongoDB");
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/todos", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
