import express from "express";
import dotenv from "dotenv";
import connectDB from "./config.js";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1", router);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
