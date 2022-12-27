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