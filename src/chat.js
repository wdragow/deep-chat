const io = require("socket.io-client");
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin,  output: process.stdout });

rl.question('What\'s your name ? ', (name) => {
    const socket = io('http://localhost:3000');

    const sendMsg = () => {
        rl.question('> ', (reply) => {
            console.log(`Sending message: ${reply}`);
            socket.emit('simple chat message', `${name} says ${reply}`);
            sendMsg();
        });
    }

    socket.on('connect', () => {
        console.log('Sucessfully connected to server.');
        sendMsg();
    });

    socket.on('simple chat message', (message) => {
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('Connection lost...')
    }); 
    
});
