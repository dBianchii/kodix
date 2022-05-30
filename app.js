
var express = require('express');
var app = express();
var path = require('path');


var usersRouter = require('./routes/users')
var indexRouter = require('./routes/index');
var leadTrackRouter = require('./routes/leadTrack');



// view engine setup
app.set('view engine', 'pug');

app.use('/users', usersRouter)
app.use('/', indexRouter);
app.use('/leadTrack', leadTrackRouter);


module.exports = app;
