import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error("MONGO_URL environment variable is not set");
    }
    mongoose.connect(mongoUrl)
        .then(() => console.log(`connected to database ✅`))
        .catch((err) => console.log(`Error connecting to the database ❌`, err));
}

export default connectDB;