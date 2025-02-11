// Make connection
var socket = io.connect('https://fastwebchat-484ab2d0e314.herokuapp.com/');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    let usuario = handle.value.trim();
    let mensaje = message.value.trim();

    if (usuario === "" || mensaje === "") {
        alert("Por favor, ingresa un nombre de usuario y un mensaje.");
        return;
    }

    socket.emit('chat', {
        message: mensaje,
        handle: usuario
    });

    message.value = "";
});

message.addEventListener('keypress', function(){
    let usuario = handle.value.trim();
    if (usuario !== "") {
        socket.emit('typing', usuario);
    }
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' está escribiendo...</em></p>';
});
