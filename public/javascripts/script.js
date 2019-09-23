var socket = io('http://localhost:8000');
socket.on('connect',function () {
    console.log('Connected');
    socket.on('new-message',function (message) { // lorsque le message arrive
        addMessage(message); // on l'affiche
    });
});
// récupère l'id du bouton envoyer message
var formNewMessage = document.getElementById('new-message');
var listNewMessages = document.getElementById('list-messages');

formNewMessage.addEventListener('submit',function (event) {
    event.preventDefault(); // annule l'action de redirection

    var form = event.target;
    var formData = new FormData(form);
    var url = form.action; // permet de récupérer /message
// appele le server en /message post
    fetch(url,{
        method:"POST",
        headers:{
          'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(Object.fromEntries(formData))
    })
        .then(response=>response.json())
        .then(message=> {
            addMessage(message);
            form.reset();
            socket.emit('new-message',message)}
        );
});

function addMessage(message) {
    var li = document.createElement('li');
    li.innerText = message.content;
    listNewMessages.appendChild(li);
}