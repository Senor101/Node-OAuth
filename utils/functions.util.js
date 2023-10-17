const User = require("../models/user.model");

const checkUser = async (providerId, provider) => {
  const user = await User.findOne({
    providerId: providerId,
    provider: provider,
  });
  if (user) {
    return true;
  } else return false;
};

const findOrCreateUser = async (user) => {
  if (await checkUser(user.providerId, user.provider)) {
    return await User.findOne({ providerId: user.providerId });
  } else {
    return await User.create(user);
  }
};

module.exports = {
  checkUser,
  findOrCreateUser,
};
