import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new user (Register)
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered", success: false });
  }

  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: "User registered successfully", user, success: true });
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
  const { uId } = req.body;
  const user = await User.findById(uId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  res.status(200).json({ user, success: true });
});

// Update user by ID
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, uId } = req.body;
  const user = await User.findByIdAndUpdate(
    uId,
    { name, email },
    { new: true, runValidators: true }
  );
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  res.status(200).json({ message: "User updated successfully", user, success: true });
});

// Delete user by ID
const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  await User.deleteOne({ _id: user._id });
  res.status(200).json({ message: "User deleted successfully", success: true });
});

// User login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password", success: false });
  }
  res.status(200).json({ message: "Login successful", user, success: true });
});

export { createUser, getUserById, updateUser, deleteUser, loginUser };
