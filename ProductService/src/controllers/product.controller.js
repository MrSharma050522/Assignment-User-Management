const Product = require("../models/product.model");
const axios = require("axios");

// Create Product
exports.createProduct = async (req, res) => {
	try {
		const { userId } = req.body;

		// Check if user exists before assigning product
		const userResponse = await axios.get(
			`http://localhost:5001/users/${userId}`
		);
		if (!userResponse.data) {
			return res.status(404).json({ error: "User not found" });
		}

		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get All Products
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.findAll(); // Fetch all products

        // Fetch user details for each product
        const productsWithUsers = await Promise.all(
            products.map(async (product) => {
                try {
                    // Make an HTTP request to User Service to get user details
                    const userResponse = await axios.get(`http://localhost:5001/users/${product.userId}`);
                    const userName = userResponse.data.name; // Extract user name
                    return {
                        ...product.toJSON(),
                        userName, // Add user name to product data
                    };
                } catch (error) {
                    console.error(`Error fetching user for product ${product.id}:`, error.message);
                    return { ...product.toJSON(), userName: "Unknown User" };
                }
            })
        );

        res.json(productsWithUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product)
			return res.status(404).json({ error: "Product not found" });
		res.json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update Product
exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product)
			return res.status(404).json({ error: "Product not found" });

		await product.update(req.body);
		res.json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete Product
exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product)
			return res.status(404).json({ error: "Product not found" });

		await product.destroy();
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
