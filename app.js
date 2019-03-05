var express = require('express');
var app = express();
var db = require('./db');
var AuthRouter = require('./routes/Authentication');
var UserRouter = require('./routes/User');

app.use('/users', UserRouter);
app.use('/api/auth', AuthRouter);

module.exports = app;