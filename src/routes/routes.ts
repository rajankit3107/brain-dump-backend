import express from 'express';
import { CreateContent, getContent, shareBrain, shareLink, Signup, Singin } from "../controllers/controllers.js";
import { userMiddleware } from '../middlewares/middleware.js';

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Singin);
router.post('/content',userMiddleware, CreateContent)
router.get('/content', userMiddleware, getContent)
router.post('/share',userMiddleware, shareBrain)
router.get('/share/:shareLink',userMiddleware, shareLink)

export default router;

