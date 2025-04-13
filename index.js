const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bootstrap = require("./db/db.config");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");
const rareLimit = require("express-rate-limit");

dotenv.config();

const User = require("./model/user.model");

const app = express();

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors({ origin: "localhost:3000", credentials: true }));
app.use(rareLimit({ window: 1000 * 60, rareLimit: 5 }));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

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
