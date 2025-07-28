import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.ts';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import WebsocketServer from './sockets/WebSocketServer.ts';
import http from 'http';

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);

app.use('/api/v1', router);

new WebsocketServer(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT);
