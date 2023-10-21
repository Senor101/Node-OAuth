const User = require("../models/user.model");

const checkUser = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return true;
  } else return false;
};

const findOrCreateUser = async (user) => {
  const { providerId, provider } = user;
  const userExists = await User.findOne({
    providerId: providerId,
    provider: provider,
  });
  if (userExists) {
    return userExists;
  } else {
    return await User.create(user);
  }
};
module.exports = {
  checkUser,
  findOrCreateUser,
};
