var socket = io('http://localhost:8000');
socket.on('connect',function () {
    console.log('Connected');
    socket.on('new-message',function (message) { // lorsque le message arrive
        console.log(message); // on l'affiche
    });
});
// récupère l'id du bouton envoyer message
var formNewMessage = document.getElementById('new-message');

formNewMessage.addEventListener('submit',function (event) {
    event.preventDefault(); // annule l'action de redirection

    var form = event.target;
    var formData = new FormData(form);
    var url = form.action;
// appele le server en /message post
    fetch(url,{
        method:"POST",
        body:formData
    })
});