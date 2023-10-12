const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const customErrorhandler = require("./middleware/errorhandler.middleware");
const authRouter = require("./routes/auth/auth.router");
const config = require("./config/env.config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const GOOGLE_AUTH_OPTIONS = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, verifyCallback));

app.use("/auth", authRouter);
app.use(customErrorhandler);

module.exports = app;
