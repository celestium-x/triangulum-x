import express from "express";
import dotenv from "dotenv"
import router from "./routes/index.ts";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}))
const PORT = process.env.PORT;
if (!PORT) {
    console.error("port not found")
}

app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
