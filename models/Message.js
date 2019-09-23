// Import de mongoose pour gérer la base de donnée mongo
const mongoose = require('mongoose');
// création d'une nouvelle collection
const messageSchema = new mongoose.Schema ({
    user: {type:mongoose.Schema.Types.ObjectID, ref:'Users'}, //permet de joindre a message, Users id
    content: String,
    createdAt: Date
});

// Pour enregistrer automatiquement la date du jour a chaque message
messageSchema.pre('save',function () {
    this.createdAt= new Date();
});

module.exports = mongoose.model('message',messageSchema);