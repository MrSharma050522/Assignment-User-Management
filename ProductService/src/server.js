require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("../src/models");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", require("../src/routes/product.routes"));

const PORT = process.env.PORT || 5002;
sequelize.sync().then(() => {
	app.listen(PORT, () =>
		console.log(`Product Service running on port ${PORT}`)
	);
});
