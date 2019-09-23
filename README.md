#DEV CONTACT

## 1 install du projet
Pour installer le projet :
npx express-generator --view=pug --git --css=sass devcontactpro


puis npm install

ensuite importer le projet dans WebStorm

## 2 installer dot env pour le support du .env
https://www.npmjs.com/package/dotenv

npm install dotenv
creer un fichier .env

et indiquer le numéro du port utilisé dans le fihier

## 3 installer nodemon
Afin de recharger le server après chaque modif
npm install nodemon --save-dev


Pour repasser en scss : renommer le fichier en .scss (modifier le code sass) et modifier app.npmjs:
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

## 4 Installation de Mangoose

https://www.npmjs.com/package/mongoose
npm install mongoose

Créer le schéma de la base

## 5 Authentification
http://www.passportjs.org/packages/
https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
https://github.com/saintedlama/passport-local-mongoose

npm install --save passport passport-local passport-local-mongoose

npm install express-session
renseigner : app.use(cookieParser('azerty')); et app.use (session({}));

## 6 JWT
npm install passport passport-local passport-jwt

## 7 Socket.Io

install server
npm install socket.io

install front
nouveau fichier script Message.js
récupérer le fichier https://raw.githubusercontent.com/socketio/socket.io-client/master/dist/socket.io.js
et le coller dans public, javascipt socketio.io.js
il sert a la connexion au server via le systeme socket




## ----------- ##
projet node tchat devcontact
-------------------------------------------------------------------------------------
--install generator --
    npx express-generator --view=pug --css=sass devcontact
--si on veut modifier le port dans le fichier WWW (redemarrer le serveur si on effectue
l'opération en cours de projet)--
    npm i dotenv
        --puis mettre--
            require('dotenv').config(); ligne 7 de app.js
        --puis creer un fichier .env et mettre--
        PORT=8000
--install nodemon--
    npm i nodemon --dev
        --modifier package.json l-6--
            "start": "node_modules/.bin/nodemon ./bin/www"
--npm--
    npm start
--controler page web--
    localhost:8000
--pour travailler en scss, changer l extension du dossier sass en scss
 et aller dans app.js l-24 pour basculer en false--
indentedSyntax: false, // true = .sass and false = .scss
--install mongoose (equivalent doctrine),changer de terminal-- mongodb sera installe--
    npm i mongoose
    dans app.js l-7
    const mongoose = require ('mongoose');
    dans.env
    DB_NAME=devcontact
--changer l-31 de app.js
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
--l-35 --
    app.locals.db = mongoose.connection;//enregister la cnx dans une variable globale
--dans WWW l-28--
    app.locals.db.once('open', () => {
    server.listen(port);
    });
----------------------------------------------------------------------------------------------
--creer un dossier models a la racine puis un fichier user.js--
    const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      'Email non valide !'
    ]
  },
  linkedin: String,
  avatar: String,
  createdAt: Date
});
userSchema.virtual('fullname').get(function() {
  return this.firstname + ' ' + this.lastname
});
userSchema.pre('save', function() {
  this.createdAt = new Date();
});
userSchema.post('save', user => {
  console.log('Nouvel utilisateur : ' + user.fullname);
});
module.exports = mongoose.model('User', userSchema);
-------------------------creation formulaire------------------------------------------------------
--routes de users--
    var express = require('express');
    var router = express.Router();
    /* GET users listing. */
    router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    });
    router.get('/new', (req, res) => {
    res.render('users/new');
    });
    module.exports = router;
--dans views creer  un dossier users et un fichier new.pug--
extends ../layout
block content
    form(action='/users' method='POST')
        .form-control
            label Prénom
            input(type='text' name='firstname' placeholder='Prénom')
        .form-control
            label Nom
            input(type='text' name='lastname' placeholder='Nom')
        .form-control
            label Email
            input(type='email' name='email' placeholder='Email')
        input(type='submit')
--dans views, index.pug--l-7--"ATTENTION à L'INDENTATION"----
    extends layout
    block content
    h1= title
    p Welcome to #{title}
    a(href='/users/new') Créer un compte
    a(href='/users/new') Créer un compte
--dans routes, users.js--l-14--
    router.post('/', (req, res, next) => {
    const user = new User(req.body);
    user.save(err => {
        if (err) {
         return next(err);
        }
        res.redirect('/');
    });
--dans routes, users.js-l-4--
    const createError = require('http-errors');
--controle sur Compass et dans terminal que les nouveaux users sont créés--
-----------------Création bouton page accueil-----------------------------------------------
--dans users.js-l-6---------
router.get('/', function(req, res, next) {
  User.find((err, users) => {
    res.render('users/list', { users: users })
  });
});
--dans dossier users--
     --créer fichier list.pug avec--
        extends ../layout
        block content
                ul
                    each user in users
                            li= user.fullname
----------------------------------modif-------------------------------------------------------
--index.pug--
extends layout
block content
  h1= title
  p Welcome to #{title}
layout.pug--
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    header
      nav
        ul
          li
            a(href='/') Accueil
          li
            a(href='/users/new') Créer un compte
          li
            a(href='/users') Liste des utilisateurs
    block content
-------------------------------------------------------------------------------------------
-----------------------------------authentification----------------------------------------
--install passport--
    npm install --save passport passport-local-mongoose
--dans app.js--l-8
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
--dans app.js-l-32
app.use(passport.initialize());
app.use(passport.session());
--dans models, user.js--l-4
 username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
--l-2
    const passportLocalMongoose = require('passport-local-mongoose');
--l-25
    userSchema.plugin(passportLocalMongoose);
--dans app.js--l40
mongoose.connect('mongodb://localhost/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
app.locals.db = mongoose.connection; // Enregistrer la connexion dans une variable globale
--l31--
mongoose.connect('mongodb://localhost/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
--dans new.pug--l-6
     label Username
            input(type='text' name='username' placeholder='Username')
        .form-control
            label Mot de passe
            input(type='password' name='password' placeholder='Mot de passe')
        .form-control
--users--l-6
router.get('/', function(req, res, next) {
  User.find((err, users) => res.render('users/list', { users: users }) );
});
--users.js--l-14
router.post('/', (req, res, next) => {
  User.register(req.body, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.redirect('/');
  });
});
----------------------corrections-a-faire-----------------------------------------------
npm i express-session
--app.js-l-31
app.use(session({
  secret: 'azerty',
  resave: false,
  saveUninitialized: true
}));
--users.js--l-27
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});
-users.js--l-4--
    const passport = require('passport');
--index.js--l-
    console.log(req.user);
--index.pug--
extends layout
block content
  h1= title
  p Welcome to #{title}
  form(action='/users/login' method='POST')
    input(type='text' name='username')
    input(type='password' name='password')
    input(type='submit')
--user.js--l-6
    password: { type: String },
--index.pug--l-9
    a(href='/users/logout') Déconnexion
--users.js--
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
--users.js--l-7
router.get('/', function(req, res, next) {
  User.find((err, users) => {
    if (req.xhr) {
      res.json(users);
    } else {
      res.render('users/list', { users: users })
    }
  });
});
---------------------------------socket.io-------------------------------------------
npm i socket.io
--install--
--bin,www--l-23
    const io = require('socket.io')(server);
--bin,www-l-25
    io.on('connection', socket => console.log('nouvelle connexion'))
--dans models, creer un fichier Message.js--
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectID,
  content: String,
  createdAt: Date
});
messageSchema.pre('save', function() {
  this.createdAt = new Date();
});
module.exports = mongoose.model('Message', messageSchema);
--dans routes, creer un fichier messages.js--
var express = require('express');
var router = express.Router();
// Afficher l'ensemble des messages
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express toto', user: req.user });
});
module.exports = router;
--l-3--
    const Message = require('../models/Message');
--l-7--
Message.find((err, messages) => {
    res.render('messages/list', { messages: messages });
  });
--dans views, crrer un dossier messages puis un fichier list.pug--
extends ../layout
block content
    ul
        each message in messages
            li= message.content
--layout.pug--l-17
 li
            a(href='/messages') Liste des messages
--app.js--l-56
    app.use('/messages', messagesRouter);
--app.js-l-20--
    var messagesRouter = require('./routes/messages');
--dans public, javascripts creer un fichier socket.io.js et script.js--
--dans layout.pug--l-22
block javascripts
      script(src='/javascripts/socket.io.js')
      script(src='/javascripts/script.js')
--dans script.js--
var socket = io('http://localhost:8001');
socket.on('connect', function(){
  console.log('connected')
});
------------formulaire-------------------------------------------------------
--dans views, messages, list.pug--
extends ../layout
block content
    ul
        each message in messages
            li= message.content
    form#new-message(action='/messages' method='POST')
        textarea(name='content' placeholder='Mon message')
        input(type='submit')
--dans javascripts, script.js--
var socket = io('http://localhost:8001');
socket.on('connect', function(){
  console.log('connected');
});
var formNewMessage = document.getElementById('new-message');
formNewMessage.addEventListener('submit', function(event) {
  event.preventDefault();
  var formData = new FormData(this);
  var url = this.action;
  fetch(url, {
    method: 'POST',
    body: formData
  });
});
--dans messages.js--
var express = require('express');
var router = express.Router();
const Message = require('../models/Message');
var express = require('express');
var router = express.Router();
const Message = require('../models/Message');
// Afficher l'ensemble des messages
router.get('/', function(req, res, next) {
  Message.find((err, messages) => {
    res.render('messages/list', { messages: messages });
  });
});
router.post('/', (req, res) => {
  const message = new Message(req.body);
  message.save((err, message) => {
    req.app.locals.socket.broadcast('new-message', message);
    res.json(message);
  });
});
module.exports = router;
--dans www--
app.locals.socket = socket;


