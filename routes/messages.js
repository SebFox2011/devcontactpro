var express = require('express');
var router = express.Router();
const message=require ('../models/message');

//Afficher l'ensemble des messages
router.get('/',function (req,res,next) {
    message.find((err,messages) => {
        res.render('messages/list',{messages:messages});
    });

});

module.exports = router;