var express = require("express");
var app = express();
const Sentry = require('@sentry/node');
var AuthRouter = require("./routes/Authentication");
var UserRouter = require("./routes/User");
var ItemRouter = require("./routes/Item");
var config = require("./config")

const path = require("path");

Sentry.init({
  dsn: config.dsn,
});

var mongoose = require('mongoose');
mongoose.connect(config.mLabURI);

app.use(express.static("public"));

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/items", ItemRouter);

app.use(express.static(path.join(__dirname, "client", "build")));
app.use('/public', express.static('public'))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
