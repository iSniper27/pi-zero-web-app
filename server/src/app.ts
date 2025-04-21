import helmet from "helmet";
import express from "express";
import router from "./routes/flashRoutes";
import http from 'http';
import cors from "cors";
import rateLimit from 'express-rate-limit';
import { socketServer } from "./sockets/webSocket";

const app = express();
const server = http.createServer(app);

socketServer(server);

app.use(express.json());

app.set('trust proxy', 1);

app.use(cors())

app.use(rateLimit({
  windowMs: 60000,
  limit: 30
}));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

app.use('/api/', router);

export default server;