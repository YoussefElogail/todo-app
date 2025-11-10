import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: () => `user-${Date.now()}`,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "field must be an email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  image: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
