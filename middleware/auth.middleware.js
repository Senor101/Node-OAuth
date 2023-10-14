const passport = require("passport");

const isAuthenticated = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user;
    return next();
  });
};
module.exports = isAuthenticated;
