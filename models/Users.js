// Comme indiqué dans la doc officielle, créer le schéma
//https://www.npmjs.com/package/mongoose
// Doc schema et type
// https://mongoosejs.com/docs/schematypes.html

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    firstname: String,
    lastname: String,
    mail: String,
    phone: String,
    linkedin: String,
    avatar: String,
    info: String
});

userSchema.virtual('fullname').get(function () { this.firstname + ' ' + this.lastname});

userSchema.post('save',user => { // userSchema.pre existe aussi
    //console.log('Nouvel utilisateur: ' + user.firstname +' ' + user.lastname );
    console.log('Nouvel utilisateur: ' + user.fullname );
});// apres l'enregisytrement d'un utilisateur, execute la fonction , Next permet de passer au middleware suivant

module.exports = mongoose.model('User',userSchema); //USer est le nom de l'entité enregisté