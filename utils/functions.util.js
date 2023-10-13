const User = require("../models/user.model");

const checkUser = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return true;
  } else return false;
};

const findOrCreateUser = async (user) => {
  // console.log(user);
  // console.log(user.name);
  if (await checkUser(user.email)) {
    return await User.findOne({ email: user.email });
  } else {
    await User.create({
      name: user.name,
      email: user.email,
      provider: user.provider,
    });
    // return newUser;
  }
};

module.exports = {
  checkUser,
  findOrCreateUser,
};
