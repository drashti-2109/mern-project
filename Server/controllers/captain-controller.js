const Captain = require('../models/captain-model')
const CaptainService = require('../services/captain-service')

const blacklistTokenModel = require('../models/blackListToken-model')

const { validationResult } = require('express-validator')

module.exports.captainRegister = async (req , res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(401).json({errors : errors.array()})
    }
    
    const { fullname, email, password, vehicle } = req.body

    const isCaptain = await Captain.findOne({email})
    if(isCaptain){
        return res.status(401).json({message : "Captain already registered!! Please login"})
    }
    
    const captain = await CaptainService.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType
    })
    
    const token = await captain.generateToken()
    
    return res.status(200).json({captain, token})
}

module.exports.captainLogin = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(401).json({errors : errors.array()})
    }

    const { email, password } = req.body

    const isCaptain = await Captain.findOne({email})
    if(!isCaptain){
        return res.status(401).json({message : "Invalid email or password"})
    }

    const isMatch = await isCaptain.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({message : "Invalid email or password"})
    }

    const token = await isCaptain.generateToken()

    res.cookie('Token', token)

    return res.status(200).json({isCaptain, token})
}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({captain : req.captain})
}

module.exports.logoutCaptain = async (req, res) => {
    res.clearCookie('Token')

    const token = req.cookies.Token || req.header("Authorization")
    await blacklistTokenModel.create({token})

    return res.status(200).json({message : "Captain logged out"})
}