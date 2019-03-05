var express = require('express');
var app = express();
var db = require('./db');
var AuthRouter = require('./routes/Authentication');
var UserRouter = require('./routes/User');

const path = require("path");

app.use('/users', UserRouter);
app.use('/api/auth', AuthRouter);

app.use(express.static(path.join(__dirname, "client", "build")));

/* app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
 */

module.exports = app;