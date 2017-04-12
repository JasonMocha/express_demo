var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var index = require('./routes/index');
var users = require('./routes/users');
var foods=require('./routes/foods');
var cates=require('./routes/cates');
var carts=require('./routes/carts')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('secret'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  name:'session',
  secret: 'secret',
  cookie: {
    maxAge: 1800000
  },saveUninitialized:false,
  resave:true
}));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.session.user || {};
  next();
});
app.use('/', index);
app.use('/users', users);
app.use('/foods', foods);
app.use('/cates', cates);
app.use('/carts', carts);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
