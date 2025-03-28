const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Product = require("./product.model");

const db = {};
db.sequelize = sequelize;
db.Product = Product;

module.exports = db;
