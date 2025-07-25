import express from "express";
import { Signup } from "../controllers/controllers.js";

const router = express.Router();

router.post("/signup", Signup);
