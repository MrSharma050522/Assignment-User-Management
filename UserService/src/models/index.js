const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model");

const db = {};
db.sequelize = sequelize;
db.User = User;

module.exports = db;
