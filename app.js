const express = require("express");
const cookieParser = require("cookie-parser");

const passport = require("./config/passport.config");
const customErrorhandler = require("./middleware/errorhandler.middleware");
const authRouter = require("./routes/auth/auth.router");
const isAuthenticated = require("./middleware/auth.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/auth", authRouter);
app.get("/hello", isAuthenticated, (req, res, next) => {
  try {
    // console.log(req.user);
    return res.json({ message: `hello ${req.user}!` });
  } catch (error) {
    next(error);
  }
});

app.use(customErrorhandler);

module.exports = app;
