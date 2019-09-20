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
    info: String,
    createdAt: Date
});

userSchema.virtual('fullname').get(function () { return this.firstname + ' ' + this.lastname});

userSchema.pre('save',function(){
    this.createdAt = new Date (); // pour créer la date de création du compte automatiquement avec le formulaire
});

userSchema.post('save',user => { // userSchema.pre existe aussi
    //console.log('Nouvel utilisateur: ' + user.firstname +' ' + user.lastname );
    console.log('Nouvel utilisateur: ' + user.fullname );
});// apres l'enregisytrement d'un utilisateur, execute la fonction , Next permet de passer au middleware suivant

module.exports = mongoose.model('Users',userSchema); //USer est le nom de l'entité enregisté