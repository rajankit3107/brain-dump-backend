import express from "express";
import dotenv from "dotenv";
import connectDB from "./config";

const app = express();
dotenv.config();

app.use(express.json());

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
