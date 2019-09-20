var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');

// Gestion du module mongoose
const mongoose = require('mongoose');

//Gestion du fichier .env
require('dotenv').config();

//Authentification
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/Users.js');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// socket io
const messageRouter = require ('./routes/messages');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //
app.use(cookieParser('azerty'));
app.use (session({
  secret:'azerty',
  resave:false,
  saveUninitialized:true
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify: false
});
app.locals.db = mongoose.connection; // enregistrer la connexion dans une variable globale
app.listen();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// socket io
app.use('/messages',messageRouter);

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
