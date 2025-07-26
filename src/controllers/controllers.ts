import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { userSchema } from "../validators/validators.js";
import { Content, User } from "../models/model.js";
import dotenv from 'dotenv'

dotenv.config();

export const Signup = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.log(`Error while signingUp`,error)
    }
    
};

export const Singin = async(req : Request, res : Response) => {
    try {
        //get the username from the body
        const { username, password } = req.body;
        
        //doing zod validation
        const validation = userSchema.safeParse(req.body)
        if(!validation.success) res.status(411).json({message : `invalid input credentials`})
        
        //find the user in database
        const user = await User.findOne({username, password});
    
        if (!process.env.JWT_SECRET) 
            throw new Error("JWT_SECRET is not set in environment variables");
        
        //if user exist signin the user with jwt token
        if(user) {
            const token = jwt.sign({
                id : user._id
            }, process.env.JWT_SECRET)

            res.json({token})
        }else{
            res.status(403).json({message : `incorrect credentials`})
        }

    } catch (error) {   
        console.log(`Error while signingIn`, error)
    }
}

export const CreateContent = async (req:Request, res: Response) => {
    const { title, link } =  req.body
    // console.log(req.body)

    try {
        await Content.create({
            title,
            link,
            tags : [],
            //@ts-expect-error req.userId is set by custom middleware
            userId : req.userId 
        })  
    
        return res.json({
            message : `Content Added`
        })
    } catch (error) {
        console.log(error)
    }
}

export const getContent = async (req:Request, res: Response) => {
    //@ts-expect-error req.userId is set by custom middleware
    const userId = req.userId

    try {
        const content = await Content.find({
            userId : userId
        }).populate("userId", "username")
    
        res.json({
            content
        })
    } catch (error) {
        console.log(`Error while fetching content`, error)
    }
}

export const deleteContent = async(req : Request, res: Response) => {
    const { contentId } = req.body;

    try {
        await Content.deleteMany({
            contentId,
            //@ts-expect-error req.userId is set by custom middleware
            userId : req.userId
        })
    
        res.json({message : `Deleted`})
    } catch (error) {
        console.log(`Error while deleting content`, error)
    }
}

export const shareBrain = async(req : Request, res : Response) => {
    const { share } = req.body
}