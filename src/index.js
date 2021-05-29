var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('Usuário conectado!');
    
    socket.on('disconnect', () => {
        console.log('Usuário desconectado!');
    });
    
    let eventName = 'Deep Chat v1.0';
    
    let broadcast = (msg) => socket.broadcast.emit(eventName, msg);
    
    socket.on(eventName, (msg, ackFn) => {
        console.log('> ' + msg);
        // broadcast to other clients after 1.5 seconds
        setTimeout(broadcast, 1000, msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});