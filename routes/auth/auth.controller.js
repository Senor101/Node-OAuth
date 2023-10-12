const User = require("../../models/user.model");

const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(201).json({
      message: "New User created through email.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    delete user.password;
    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
