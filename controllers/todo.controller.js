import Todo from "../models/todo.models.js";
import { asyncWrapper } from "../middlewares/asyncWrapper.js";

const getTodos = asyncWrapper(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    status: "success",
    data: todos,
  });
});

const showTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.status(200).json({
    status: "success",
    data: todo,
  });
});

const createTodo = asyncWrapper(async (req, res) => {
  const body = req.body;
  const newTodo = await Todo.create(body);
  res.status(200).json({
    status: "success",
    data: newTodo,
  });
});

const updateTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { $set: { ...body } },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(404).json({
      status: "fail",
      message: "Todo not found",
      data: null,
    });
  }

  res.status(200).json({
    status: "success",
    data: updatedTodo,
    message: "Todo updated successfully",
  });
});

const deleteTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    data: null,
    message: "Todo delete successfully",
  });
});

export { getTodos, createTodo, showTodo, updateTodo, deleteTodo };
