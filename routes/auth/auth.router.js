const express = require("express");

const passport = require("passport");
const router = express.Router();

router.post("/email/register");
router.post("/email/login");

router.get("/google");

router.get("/google/callback");

router.get("/facebook");

router.get("/facebook/callback");

router.post("/logout/:id");
