
var express = require('express');
var path = require('path');


var indexRouter = require('./routes/index');
var leadTrackRouter = require('./routes/leadTrack');

var app = express();

// view engine setup

app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/leadTrack', leadTrackRouter);


module.exports = app;
