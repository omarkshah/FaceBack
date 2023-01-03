import express from 'express'
import {
    getUser, 
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ ROUTES (Routes where we grab infromation) */
router.get("/:id", verifyToken, getUser) //grabs route with particular id(user), verifies token, then gets the user withthat specific id
router.get("/:id/friends", verifyToken, getUserFriends) 

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

export default router