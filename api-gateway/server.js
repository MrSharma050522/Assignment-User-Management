require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "API Gateway is running. Use /users or /products" });
});

app.use('/users', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
