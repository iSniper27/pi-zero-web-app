import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

let io: SocketServer;

export const socketServer = (server: Server) => {
    io = new SocketServer(server, {
        cors: {
            origin: process.env.FRONTEND,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        socket.on("join_room", (roomName: string) => {
            console.log(`Client joined room: ${roomName}`);
            socket.join(roomName);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}

export { io };