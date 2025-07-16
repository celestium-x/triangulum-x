import http from "http"
import dotenv from "dotenv"
import express from 'express'
import prisma from '@repo/database'


dotenv.config();

const PORT = process.env.PORT;
if (!PORT) {
    console.log("port is not defined");
};

const app = express();
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log("server running on port 8080")
})