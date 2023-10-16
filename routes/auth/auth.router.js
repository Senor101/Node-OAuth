const express = require("express");
const jwt = require("jsonwebtoken");

const passport = require("passport");
const router = express.Router();
const { checkUser, findOrCreateUser } = require("../../utils/functions.util");

const authController = require("./auth.controller");

router.post("/email/register", authController.registerUser);
router.post("/email/login", authController.loginUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(`THIS IS UR PROFILE MAAANNNN ${req.user.email}`);
  }
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

router.post("/logout/:id");

module.exports = router;
