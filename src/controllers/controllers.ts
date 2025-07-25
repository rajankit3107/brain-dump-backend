import { Request, Response } from "express";
import { userSchema } from "../validators/validators";
import { User } from "../models/model";

export const Signup = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    //check if the coming data is correct
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) return res.status(411).json({ message: 'invalid inputs received' });

    //check for existing user
    const existingUser = await User.findOne({username})
    if(existingUser) res.status(403).json({message : `user already exists`})

    //if everything is fine create a new user
    await User.create({
        username,
        password
    });

    res.status(201).json({message : `user created successfully`});
    
};