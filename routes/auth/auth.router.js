const express = require("express");
const isAuthenticated = require("../../middleware/auth.middleware");
const passport = require("passport");
const router = express.Router();

const authController = require("./auth.controller");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallbackHandler
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  authController.facebookCallbackHandler
);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  authController.githubCallbackHandler
);

router.post("/email/register", authController.registerUser);

router.post("/email/login", authController.loginUser);

router.post("/logout", isAuthenticated, authController.logoutUser);

module.exports = router;
