const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// Required to be imported to parse JSON data from API
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Prevents server from identifying itself for potential attackers
app.use(express.static('public'))
app.disable('x-powered-by'); 

io.on('connection', function(socket) {

    socket.on('user_join', function(data) {
        this.username = data;
        socket.broadcast.emit('user_join', data);
    });

    socket.on('chat_message', function(data) {
        data.username = this.username;
        socket.broadcast.emit('chat_message', data);
    });

    socket.on('disconnect', function(data) {
        socket.broadcast.emit('user_leave', this.username);
    });
});

require('./routes/routes')(app);

app.listen(port, function() {
    console.log('Listening on *:' + port);
});