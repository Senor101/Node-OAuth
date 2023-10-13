const express = require("express");

const passport = require("passport");
const router = express.Router();
const User = require("../../models/user.model");

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
  passport.authenticate("google"),
  async (req, res) => {
    console.log("redirected", req.user);
    let user = {
      displayName: req.user.displayName,
      name: req.user.name.givenName,
      email: req.user._json.email,
      provider: req.user.provider,
    };
    console.log(user);

    const userExist = await User.find({ email: user.email });
    if (!userExist) {
      const userExist = await User.create(user);
    }
    let token = jwt.sign(
      {
        data: userExist,
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token);
    res.redirect("/");
  }
);

router.get("/facebook");

router.get("/facebook/callback");

router.post("/logout/:id");

module.exports = router;
