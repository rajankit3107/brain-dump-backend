import express from "express";
import dotenv from "dotenv";
import connectDB from "./config.js";
import router from "./routes/routes.js";
import cors from "cors"

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors())

connectDB();

app.use('/api/v1', router)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
