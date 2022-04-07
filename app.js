//this line helps us create errors to report to users
var createError = require('http-errors');
//Including express in the application
var express = require('express');

const session = require('express-session');

//Including path module
var path = require('path');
//Including cookie parser module to read cookies.
var cookieParser = require('cookie-parser');
//we require a logger called morgan.
var logger = require('morgan');

//Created routes and we have included routes files here.

// var usersRouter = require('./routes/users');

var ExamCateg = require("./routes/examcateg");

var app = express();

app.use(
  session({
    secret: 'session_secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
var models = require('./models');
models.sequelize
  .sync()
  .then(function () {
    console.log('Db working fine');
  })
  .catch(function (err) {
    console.log(err, 'Something went wrong');
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/product", ExamCateg);
//======================================exam ======================================//

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

module.exports = app;
