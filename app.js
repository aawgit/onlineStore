var express = require("express");
var app = express();
var db = require("./db");
var AuthRouter = require("./routes/Authentication");
var UserRouter = require("./routes/User");
var ItemRouter = require("./routes/Item");

const path = require("path");

app.use(express.static("public"));

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/items", ItemRouter);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
