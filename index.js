const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bootstrap = require("./db/db.config");
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

dotenv.config()

const User = require("./model/user.model");

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, (e) => {
  bootstrap()
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("MongoDB connection failed", err);
    });

  console.log("Server is running on port 3000");
});
