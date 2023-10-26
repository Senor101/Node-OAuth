const User = require("../../models/user.model");
const { findOrCreateUser } = require("../../utils/functions.util");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const googleCallbackHandler = async (req, res, next) => {
  try {
    // console.log("redirected", req.user);
    let user = {
      name: req.user._json.name,
      email: req.user._json.email,
      provider: req.user.provider,
      providerId: req.user.id,
    };
    const requiredUser = await findOrCreateUser(user);
    let token = jwt.sign(
      {
        data: {
          id: requiredUser._id,
        },
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token);
    // res.redirect("/auth/profile");
    return res.status(201).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const facebookCallbackHandler = async (req, res, next) => {
  try {
    console.log(`redirected by facebook ${req.user}`);
    let user = {
      name: req.user._json.name,
      provider: req.user.provider,
      providerId: req.user._json.id,
    };
    const requiredUser = await findOrCreateUser(user);
    let token = jwt.sign(
      {
        data: {
          id: requiredUser._id,
        },
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token);
    return res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const githubCallbackHandler = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "blank",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({
        error: {
          message: "User already exists",
        },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    delete user.password;
    let token = jwt.sign(
      {
        data: {
          id: user._id,
        },
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token);
    return res.status(201).json({
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
    let token = jwt.sign(
      {
        data: {
          id: user._id,
        },
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token);
    return res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("jwt");
  return res.status(200).json({
    message: "User logged out successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  googleCallbackHandler,
  facebookCallbackHandler,
  githubCallbackHandler,
  logoutUser,
};
