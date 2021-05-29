const io = require("socket.io-client");
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin,  output: process.stdout });

rl.question('Digite seu usuario: ', (name) => {
    const socket = io('http://localhost:3000');

    const sendMsg = () => {
        rl.question('> ', (reply) => {
            console.log(`Enviando: ${reply}`);
            socket.emit('>', `${name} says ${reply}`);
            sendMsg();
        });
    }

    socket.on('connect', () => {
        console.log('Conectado!');
        sendMsg();
    });

    socket.on('simple chat message', (message) => {
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('Conexão perdida!')
    }); 
    
});
