// db init. data
// import { DB_AUTH, DB_NAME } from './config.js';
var dbAuth = require('./config.js');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/routes');
var APIRouter = require('./routes/api');
var mongoose = require('mongoose');
var User = require('./models/User.js');

var flash = require('connect-flash');
var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// use mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true); 
mongoose.set('useNewUrlParser', true); 

mongoose.connect('mongodb+srv://' + dbAuth.DB_AUTH + '@cluster0-y9uwh.mongodb.net/' + dbAuth.DB_NAME + '?retryWrites=true&w=majority',
function(err) {
	if(err) {
		console.log('error connecting', err);
	} else {
		console.log('connected!');
	}
});

app.use(expressSession({ secret: 'sessionEncryptionKey', resave: false, 
  saveUninitialized: true, key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', APIRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;