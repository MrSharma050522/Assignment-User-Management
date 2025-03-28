const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Get all users with pagination
const getUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const users = await User.getUsers(limit, offset);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error -> ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error -> ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(name, email, hashedPassword);

    res.status(201).json({ success: true, message: "User created", userId });
  } catch (error) {
    console.error("Error -> ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.updateUser(req.params.id, name, email);

    res.status(200).json({ success: true, message: "User updated" });
  } catch (error) {
    console.error("Error -> ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Error -> ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
