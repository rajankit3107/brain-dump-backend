import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { userSchema } from "../validators/validators.js";
import { Content, Link, User } from "../models/model.js";
import dotenv from 'dotenv'
import { randomString } from "../utils/random-string-generator.js";

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
    const { title, link, type } =  req.body
    console.log("Received request body:", req.body)
    console.log("Extracted fields:", { title, link, type })

    try {
        const createdContent = await Content.create({
            title,
            type,
            link,
            tags : [],
            //@ts-expect-error req.userId is set by custom middleware
            userId : req.userId 
        })  
        
        console.log("Created content:", createdContent)
    
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
        const result = await Content.deleteOne({
            _id: contentId,
            //@ts-expect-error req.userId is set by custom middleware
            userId: req.userId
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Content not found or not authorized" });
        }
        res.json({message : `Deleted`})
    } catch (error) {
        console.log(`Error while deleting content`, error)
        res.status(500).json({ message: "Error while deleting content", error: error instanceof Error ? error.message : error });
    }
}

export const shareBrain = async(req : Request, res : Response) => {
    const { share } = req.body;

    try {
        if(share) {

            const existingLink = await Link.findOne({
                //@ts-expect-error req.userId is set by custom middleware
                userId : req.userId
            })

            if(existingLink) {
                return res.json({
                    hash : existingLink.hash
                })
            }

            const createdlink = await Link.create({
                //@ts-expect-error req.userId is set by custom middleware
                userId : req.userId,
                hash : randomString(50)
            })
            res.json({
                createdlink
            })
        }else{
           await Link.deleteOne({
                //@ts-expect-error req.userId is set by custom middleware
                userId : req.userId
            })

            res.status(400).json({message : `Removed Link`})
        }
    
        // res.status(200).json({message : `shareable link created`})
    } catch (error) {
        console.log(`Error while creating the Link`, error)
    }
}

export const shareLink = async(req : Request, res: Response) => {
    const hash = req.params.shareLink;
    console.log(hash)

    try {
        const link = await Link.findOne({
            hash
        })
        // console.log(link)
    
        if(!link) res.status(400).json({message : `sorry incorrect input recieved`})
    
        const content = await Content.find({
            userId : link?.userId
        })
        // console.log(content)
    
        const user = await User.findOne({
            _id : link?.userId
        })

        // console.log(user)
    
        if(!user) return res.status(400).json({message : `user not found`})
    
        return res.status(200).json({
            username: user.username,
            content : content
        })
    } catch (error) {
       console.log(error) 
    }
}   