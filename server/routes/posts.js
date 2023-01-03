import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

/* READ */
router.get("/", verifyToken, getFeedPosts) //gets the user feed when we are on the home page

router.get("/:userId/posts", verifyToken, getUserPosts) //gets the relevant user's posts


/* UPDATE */
router.patch("/:id/like", verifyToken, likePost) //like/unliking posts

export default router