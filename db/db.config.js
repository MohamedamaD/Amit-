const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const bootstrap = () => mongoose.connect(process.env.CONNECTION_STRING);

module.exports = bootstrap;
