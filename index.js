var express = require('express');
var socket = require('socket.io');
var cors = require('cors');

// App setup
var app = express();
var PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "https://fastweb-29361be2e352.herokuapp.com",
    methods: ["GET", "POST"]
}));

var server = app.listen(PORT, function () {
    console.log(`Listening for requests on port ${PORT}`);
});

app.use(express.static('public'));

var io = socket(server, {
    cors: {
        origin: "https://fastweb-29361be2e352.herokuapp.com",
        methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
