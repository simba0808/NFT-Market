import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: Number,
    default: 0,
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;