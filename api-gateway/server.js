require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
// app.use(express.json());

// Base API Route
app.get("/", (req, res) => {
	res.json({ message: "API Gateway is running. Use /users or /products" });
});

const proxyOptions = {
    changeOrigin: true,
    logLevel: "debug",
};

// Proxying Requests
app.use(
	"/users",
	createProxyMiddleware({
		target: "http://localhost:5001/users",
		pathRewrite: { "^/users": "/" }, // Fixes forwarding to /users
        ...proxyOptions,
	})
);
app.use(
	"/products",
	createProxyMiddleware({
		target: "http://localhost:5002/products",
		pathRewrite: { "^/products": "/" }, // Fixes forwarding to /products
        ...proxyOptions,
	})
);

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
