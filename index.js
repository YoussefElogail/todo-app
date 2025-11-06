import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRouter from "./routes/todo.route.js";
const app = express();
dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.MONGO_URL;
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
