var express = require('express');
var router = express.Router();
const Message=require ('../models/Message');

//Afficher l'ensemble des messages
router.get('/',function (req,res,next) {
    Message.find((err,messages) => {
        res.render('messages/list',{messages:messages});
    });

});

router.post('/',(req,res,next) => {
    const message = new Message(req.body); // création d'un message avec les données du message envoyé
    message.user = req.user._id;
    message.save((err,message) => {
        if(err){
            return next(err);
        }
        res.json(message);
    });
});

module.exports = router;