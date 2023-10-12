const express = require("express");

const customErrorhandler = require("./middleware/errorhandler.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
