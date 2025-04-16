const User = require("../model/user.model");
const { hashPassword, comparePassword } = require("../utils/hashing");
const { generateToken } = require("../utils/jwt");
const { registerSchema } = require("../validators/auth.validator");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });

    // check user is exist
    if (!user) {
      return res.status(404).json({
        message: "User not found, please register",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    // check password is correct
    if (!isMatch) {
      return res.status(404).json({
        message: "invalid credentials",
      });
    }

    // generate token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      message: "login successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({ email: value.email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(value.password);

    const newUser = await User.create({ ...value, password: hashedPassword });
    const token = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role });

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { login, register };
