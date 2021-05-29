import io from "socket.io-client";
import { createInterface } from 'readline';
const rl = createInterface({ input: process.stdin,  output: process.stdout });

rl.question('Digite seu usuario: ', (name) => {
    const socket = io('http://localhost:3000');

    const sendMsg = () => {
        rl.question('>', (reply) => {
            socket.emit('deepchatV1.0', `${name}: ${reply}`);
            sendMsg();
        });
    }

    socket.on('connect', () => {
        console.log('Conectado!');
        sendMsg();
    });

    socket.on('deepchatV1.0', (message) => {
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('Conexão perdida!')
    }); 
});
