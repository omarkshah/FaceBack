import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

/* REGISTER USER */
export const register = async (req, res)=> {
    try{
        const {
            firstName, 
            lastName,
            email, 
            password, 
            picturePath, 
            friends, 
            location, 
            occupation
        } = req.body

        const salt = await bcrypt.genSalt() //uses this random salt to encrypt password
        const passwordHash = await bcrypt.has(password, salt)

        //Creating the new user (this is imported from user.js mongoose schema)
        const newUser = new User({
            firstName, 
            lastName,
            email, 
            password, 
            picturePath, 
            friends, 
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random()*1000),
            impression: Math.floor(Math.random()*1000)
        })

        //Saving the new user
        const savedUser = await newUser.save()

        //status: 201 == something has been created
        res.status(201).json(savedUser) //send the user back 

    }catch(err){
        res.status(500).json({error: err.message})
    }
}

/* LOGGIN IN FUNCTION*/
export const login = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email: email }) //using mongoose to find user with that email

        if(!user){
            return res.status(400).json({msg: "User does not exist."}) //if improper email is put in
        }

        const isMatch = await bcrypt.compare(password, user.password) //comparing the password sent in with the one in database
        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials."}) //if improper email is put in
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        delete user.password
        res.status(200).json({ token, user})


    }catch(err){
        res.status(500).json({error: err.message})
    }
}

export default ()=>{}