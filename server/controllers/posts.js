import Post from "../models/Post.js"
import User from "../models/User.js"

/* CREATE FUNCTIONS */
export const createPost = async (req, res) => {
    try{
        const {userId, description, picturePath } = req.body

        const user = await User.findById(userId)
        const newPost = new Post({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location, 
            description, 
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save()

        //returning a list the posts (updated)
        const post = await Post.find()

        res.status(201).json(post)

    }catch(err){
        res.status(409).json({ message: err.message })
    }
}

/* READ FUNCTIONS*/
export const getFeedPosts = async(req, res) => {
   
    
    try{
        console.log("TRYING")
        const post = await Post.find()
        res.status(200).json(post)
 
    
    }catch(err){
        console.log("TRYING 404")
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async(req, res) => {
    try{
        
        const { userId } = req.params

        const post = await Post.find({ userId })
        res.status(200).json(post)
 
    
    }catch(err){
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try{
        
        const {id} = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId) //if the user id exists in the likes

        if(isLikes){
            post.likes.delete(userId)
        }
        else{
            post.likes.set(userId, true)
        }
        
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost) //updating the front end
 
    
    }catch(err){
        res.status(404).json({ message: err.message })
    }
}
