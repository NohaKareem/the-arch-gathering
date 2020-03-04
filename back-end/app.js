var dbAuth = require('./config.js'); // atlas db credentials
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

// passport 
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = '1699158153703160';
var FACEBOOK_APP_SECRET = '88d2e6724b1feaa30629bd08feb09554';

var favicon = require('serve-favicon');

var app = express();

// allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// allowing cors, from https://github.com/rkpattnaik780/passport-mevn-app/blob/master/server/app.js
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  exposedHeaders: ["x-auth-token", "refresh-token"],
  credentials: true
};

var cors = require("cors");
app.use(cors(corsOption));
app.use(cors())

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

// sessions resave https://stackoverflow.com/a/51540685
app.use(expressSession({ secret: 'sessionEncryptionKey', 
  resave: true,//false, 
  saveUninitialized: true, 
  // cookie: { secure: true }
  key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// facbeook
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id','displayName','photos']
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    //Assuming user exists
    //console.log(profile.displayName);
    //user = profile.displayName;
    //console.log(profile.photos[0].value);
    done(null, profile);
  });
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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