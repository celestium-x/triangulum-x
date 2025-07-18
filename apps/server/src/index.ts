import express from "express";
import dotenv from "dotenv"
import router from "./routes/index.ts";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
if (!PORT) {
    console.log("port not found")
}

app.use(express.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
