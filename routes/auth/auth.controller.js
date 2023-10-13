const User = require("../../models/user.model");
const { findOrCreateUser } = require("../../utils/functions.util");

const jwt = require("jsonwebtoken");
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

const googleCallbackHandler = async (req, res, next) => {
  try {
    // console.log("redirected", req.user);
    let user = {
      name: req.user._json.name,
      email: req.user._json.email,
      provider: req.user.provider,
    };
    await findOrCreateUser(user);
    let token = jwt.sign(
      {
        data: {
          email: user.email,
        },
      },
      "secret",
      { expiresIn: "1h" }
    );
    // console.log(`token: ${token}`);
    res.cookie("jwt", token);
    // res.redirect("/auth/profile");
    res.status(201).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, googleCallbackHandler };
