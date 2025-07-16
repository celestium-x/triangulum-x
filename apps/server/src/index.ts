import http from "http"
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT;
if (!PORT) {
    console.log("port is not defined");
};

const server = http.createServer();


server.listen(8080, () => {
    console.log("server running on port 8080")
})