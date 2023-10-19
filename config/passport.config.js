const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");
const config = require("./env.config");
const { checkUser, findOrCreateUser } = require("../utils/functions.util");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

const JWT_OPTIONS = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "secret",
};
const GOOGLE_AUTH_OPTIONS = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
};
const FACEBOOK_AUTH_OPTIONS = {
  clientID: config.FACEBOOK_CLIENT_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
};

const verifyJwtCallback = async (jwt_payload, done) => {
  console.log(jwt_payload.data);
  if (
    await checkUser(jwt_payload.data.providerId, jwt_payload.data.providerId)
  ) {
    console.log(`user found`);
    return done(null, jwt_payload.data);
  } else {
    console.log(`user not found`);
    return done(null, false);
  }
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.use(new JwtStrategy(JWT_OPTIONS, verifyJwtCallback));

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, verifyCallback));

passport.use(new FacebookStrategy(FACEBOOK_AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  // console.log(`user, ${user}`);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  // console.log(`id, ${id}`);
  done(null, id);
});

module.exports = passport;
