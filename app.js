const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const customErrorhandler = require("./middleware/errorhandler.middleware");
const authRouter = require("./routes/auth/auth.router");
const config = require("./config/env.config");
const { checkUser, findOrCreateUser } = require("./utils/functions.util");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

const GOOGLE_AUTH_OPTIONS = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log(`Google callback ${profile}`);
  return done(null, profile);
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(`JWT ${jwt_payload}`);
    if (await checkUser(jwt_payload.data.email)) {
      console.log(`user found`);
      return done(null, jwt_payload.data);
    } else {
      console.log(`user not found`);
      return done(null, false);
    }
  })
);

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  console.log(`user, ${user}`);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log(`id, ${id}`);
  done(null, id);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    console.log("redirected", req.user);
    let user = {
      displayName: req.user.displayName,
      name: req.user.name.givenName,
      email: req.user._json.email,
      provider: req.user.provider,
    };
    console.log(user);

    await findOrCreateUser(user);
    let token = jwt.sign(
      {
        data: user,
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token);
    res.redirect("/");
  }
);

// app.use("/auth", authRouter);

app.use(customErrorhandler);

module.exports = app;
