const express = require("express");

const passport = require("passport");
const router = express.Router();

const authController = require("./auth.controller");

router.post("/email/register", authController.registerUser);
router.post("/email/login", authController.loginUser);

router.get("/google");

router.get("/google/callback");

router.get("/facebook");

router.get("/facebook/callback");

router.post("/logout/:id");
