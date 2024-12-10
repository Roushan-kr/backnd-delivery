import User from "../models/User.js";

// Create a new user (Register)
const createUser = async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    // console.log(name, email, password);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" ,sucess: false});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" ,sucess: false});
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user , sucess: true});
  } catch (error) {
    res.status(500).json({ error: error.message ,sucess: false});
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { uId } = await req.body;
    const user = await User.findById(uId);
    if (!user) {
      return res.status(404).json({ message: "User not found" ,sucess: false});
    }
    res.status(200).json({user, sucess: true});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { name, email , uId} = await req.body;
    const user = await User.findByIdAndUpdate(
        uId,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found",sucess: false });
    }
    res.status(200).json({ message: "User updated successfully", user, sucess: true });
  } catch (error) {
    res.status(500).json({ error: error.message,sucess: false });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { email } = await req.body;
    const user = await User.find({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found",sucess: false });
    }
    User.deleteOne(user._id);
    res.status(200).json({ message: "User deleted successfully" , sucess: true});
  } catch (error) {
    res.status(500).json({ error: error.message ,sucess: false});
  }
};



// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" ,sucess: false});
    }
    res.status(200).json({ message: "Login successful", user , sucess: true});
  } catch (error) {
    res.status(500).json({ error: error.message,sucess: false });
  }
};

export  { createUser, getUserById, updateUser,deleteUser ,loginUser};