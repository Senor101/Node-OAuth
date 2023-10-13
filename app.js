const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const customErrorhandler = require("./middleware/errorhandler.middleware");
const authRouter = require("./routes/auth/auth.router");
const config = require("./config/env.config");
const JwtStrategy = require("passport-jwt/lib/strategy");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

var opts = {};
const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};
opts.secretOrKey = "secret";

opts.jwtFromRequest = cookieExtractor;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(`JWT ${jwt_payload}`);
    return done(null, jwt_payload);
  })
);

const GOOGLE_AUTH_OPTIONS = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log(`Google callback ${profile}`);
  return done(null, profile);
};

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  console.log(`user, ${user}`);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log(`id, ${id}`);
  done(null, id);
});

app.use("/auth", authRouter);

app.use(customErrorhandler);

module.exports = app;
