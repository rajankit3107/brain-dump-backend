import express from "express";
import dotenv from "dotenv";
import connectDB from "./config.js";
import router from "./routes/routes.js";
<<<<<<< HEAD
=======

>>>>>>> d44a8d161c8c60c2b2beed75347e09db8a07057f

const app = express();
dotenv.config();

app.use(express.json());

connectDB();

app.use('/api/v1', router)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
