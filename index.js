const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bootstrap = require("./db/db.config");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comments.routes");
const cors = require("cors");
const rareLimit = require("express-rate-limit");
const sequelize = require("./db/sequelize.config");
const associations = require("./utils/associations");
const User = require("./model/user.model.sql");
const Profile = require("./model/profile.model.sql");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors({ origin: "localhost:3000", credentials: true }));
app.use(rareLimit({ window: 1000 * 60, rareLimit: 5 }));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", async (req, res) => {
  const user = await User.findByPk(2);

  res.send(await user.getProfile());
});

app.listen(3000, async (e) => {
  console.log("Server is running on port 3000");
  try {
    await sequelize.authenticate();
    associations();
    await sequelize.sync({ alter: true, force: false });
    console.log("SQL connected successfully");
  } catch (err) {
    console.error("SQL connection failed", err);
  }
  bootstrap()
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("MongoDB connection failed", err);
    });
});
