const User = require('../models/user-model')
const userService = require('../services/user-service') 
const blackListTokenModel = require('../models/blackListToken-model')

const { validationResult } = require('express-validator')

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
        
        const { fullname, email, password } = req.body
        
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message : "User already registered!! Please login"})
        }
        
        const users = await userService.createUser({
            firstname : fullname.firstname, 
            lastname : fullname.lastname,  
            email, 
            password
        })
        
        const token = await users.generateToken()
        
        return res.status(200).json({users, token})

    } catch (error){
        console.error(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
        
        const { email, password } = req.body
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "Invalid email or password"})
        }
        
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message : "Invalid email or password"})
        }
        
        
        const token = await user.generateToken()
        res.cookie('Token', token)
        
        return res.status(200).json({user, token})

    } catch (error){
        console.error(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports.getUserProfile = (req, res) => {
    res.status(200).json({users : req.user})
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('Token')

    const token = req.cookies.Token || req.header("Authorization")

    await blackListTokenModel.create({token})

    res.status(200).json({message : "User Logged Out"})
}