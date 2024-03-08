// Data base related configurations
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const mongoURI = process.env.mongoURI;

const connection = mongoose.connect(mongoURI);

module.exports = connection;
