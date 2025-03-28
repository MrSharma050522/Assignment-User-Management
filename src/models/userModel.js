const db = require("../config/db");

// Get all users with pagination
exports.getUsers = async (limit, offset) => {
  const [rows] = await db.query("SELECT id, name, email FROM users LIMIT ? OFFSET ?", [limit, offset]);
  return rows;
};

// Get user by ID
exports.getUserById = async (id) => {
  const [rows] = await db.query("SELECT id, name, email FROM users WHERE id = ?", [id]);
  return rows[0];
};

// Create a new user
exports.createUser = async (name, email, password) => {
  const [result] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
  return result.insertId;
};

// Update user details
exports.updateUser = async (id, name, email) => {
  await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
};

// Delete user
exports.deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};
