import server from "./app";
import "./sockets/webSocket";

server.listen(3001, '0.0.0.0', () => {
    console.log(`Backend listening at 3001`);
});