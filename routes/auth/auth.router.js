const express = require("express");

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

router.post("/email/register", authController.registerUser);

router.post("/email/login", authController.loginUser);

router.post("/logout", authController.logoutUser);

module.exports = router;
