const User = require("../models/user.model");

const checkUser = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) return true;
  else return false;
};

const findOrCreateUser = async (user) => {
  if (checkUser(user.email)) {
    return await User.findOne({ email: user.email });
  } else {
    const newUser = await User.create(user);
    return newUser;
  }
};

module.exports = {
  checkUser,
  findOrCreateUser,
};
