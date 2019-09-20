var express = require('express');
var router = express.Router();
const User = require('../models/Users');
var createError = require('http-errors');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new',(req,res) => {
  res.render('users/new');
});

router.post('/',(req,res,next) => {
 /* const user = new User();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname*/

  const user = new User(req.body);
   // fonction asynchrone , voir https://mongoosejs.com/docs/models.html#constructing-documents
  user.save((err) => {

    if(err){
      return next(err);
    }
    console.log('Utilisateur enregistré');
    res.redirect('/');
  });
});
module.exports = router;
