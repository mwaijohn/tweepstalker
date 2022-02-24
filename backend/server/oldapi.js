var createError = require('http-errors');
var express = require('express');
const serverless = require("serverless-http");
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

var apiRouter = require('../routes/router.api');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(`/.netlify/functions/api`, apiRouter);

module.exports = app;
module.exports.handler = serverless(app);