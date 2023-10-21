const passport = require("../config/passport.config");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    console.log(`user ${user}`);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    return next();
  })(req, res, next);
};

module.exports = isAuthenticated;
