const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

// userSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     // Hash the password before saving
//     this.password = bcrypt.hashSync(this.password, 10);
//   }
//   next();
// });

// userSchema.method.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// const user = await User.findOne(_id) user.comparePassword(password)

const User = mongoose.model("User", userSchema); // => users

module.exports = User;
