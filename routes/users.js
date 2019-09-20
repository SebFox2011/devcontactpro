var express = require('express');
var router = express.Router();
const User = require('../models/Users');
var createError = require('http-errors');
//Pour gérer l'authetificaiton
const passport = require('passport');

/* Retourne la liste des utilisateurs */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if(err){
      return next(err);
    }
    // pour reactJS renvoie une réponse JSON / ajouter a la requete fecth le header X-Requested-With: XMLHttpRequest
    if (req.xhr){
      res.json(users);
    }
    else{ // renvoie une réponse html
      res.render('users/list',{users:users}); // envoie la liste des utilisateur à la vue /users
    }
  });
});

// affiche le formulaire de création d'un login/password
router.get('/new',(req,res) => {
  res.render('users/new');
});

//route pour se logger
router.post('/login', passport.authenticate('local'),function (req,res) {
  res.redirect('/');
});

//route pour se deloger
router.get('/logout', function (req,res) {
  req.logout();
  res.redirect('/');
});

router.post('/',(req,res,next) => {
  const {password} = req.body;
  delete req.body.password;
 /* const user = new User();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname*/
 // User.register remplace maintenant user.save
  // Suivre cette doc: https://github.com/saintedlama/passport-local-mongoose
 User.register(req.body,password,(err,user) =>{

   if(err){
     console.log(err);
     return next(err);
   }
   console.log('Utilisateur enregistré');
   res.redirect('/');
 });

 /* const user = new User(req.body);
   // fonction asynchrone , voir https://mongoosejs.com/docs/models.html#constructing-documents
  user.save((err) => {

    if(err){
      return next(err);
    }
    console.log('Utilisateur enregistré');
    res.redirect('/');
  });*/
});
module.exports = router;
