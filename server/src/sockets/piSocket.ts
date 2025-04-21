import '../config/env';
import { io as socketIoClient } from 'socket.io-client';

const piSocket = socketIoClient(process.env.PIZERO, {
    reconnection: true,
    transports: ['websocket'],
});

piSocket.on('connect', () => {
    console.log('pi connected');
});

piSocket.on('disconnect', () => {
    console.log('pi disconnected');
});

export default piSocket;
