var socket = io('http://location.hostname:8000');
socket.on('connect',function () {
    console.log('Connected');
    socket.on('new-message',function (message) { // lorsque le message arrive
        addMessage(message); // on l'affiche
    });
    socket.on('square-move',function (position) { // lorsque le message arrive
        square.style.marginLeft = position.x+'px';
        square.style.marginTop = position.y+'px';
    });
});
// récupère l'id du bouton envoyer message
var formNewMessage = document.getElementById('new-message');
var listNewMessages = document.getElementById('list-messages');
var square = document.getElementById('square');
var marginLeft = 0;
document.addEventListener('keydown',function (event) {
   console.log(event);
   if (event.code == 'ArrowLeft'){
       if (marginLeft >0)
            marginLeft -=10;

   }
   else if(event.code == 'ArrowRight') {
       marginLeft +=10;
   }
   square.style.marginLeft=marginLeft +'px';
   socket.emit('square-move',{x:marginLeft,y:0});
});

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
    var spanUsername = document.createElement('span');
    var spanMessage = document.createElement('span');

    spanUsername.innerText = message.user.username;
    spanMessage.innerText = message.content;

    spanUsername.className = 'username';
    spanMessage.className = 'message';

    li.appendChild(spanUsername);
    li.appendChild(spanMessage);

    listNewMessages.appendChild(li);
}