const express = require("express");

const customErrorhandler = require("./middleware/errorhandler.middleware");
const authRouter = require("./routes/auth/auth.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use(customErrorhandler);

module.exports = app;
