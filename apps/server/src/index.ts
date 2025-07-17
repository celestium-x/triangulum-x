import express from "express";
import router from "./routes/auth-route/auth.ts";
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT;
if (!PORT) {
    console.log("port not found")
}

app.use(express.json());


// auth-route (next-auth)
app.use("/auth", router);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
