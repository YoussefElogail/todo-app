import Todo from "../models/todo.models.js";

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      status: "success",
      data: todos,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: null,
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const body = req.body;
    const newTodo = await Todo.create(body);
    res.status(200).json({
      status: "success",
      data: newTodo,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export { getTodos, createTodo };
