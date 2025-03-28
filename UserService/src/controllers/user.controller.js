const User = require("../models/user.model");

// Create User
exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get All Users
exports.getUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get Single User by ID
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) return res.status(404).json({ error: "User not found" });
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update User
exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) return res.status(404).json({ error: "User not found" });

		await user.update(req.body);
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete User
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) return res.status(404).json({ error: "User not found" });

		await user.destroy();
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
