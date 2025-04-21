const Captain = require('../models/captain-model')
const blacklistTokenModel = require('../models/blackListToken-model')
const jwt = require('jsonwebtoken')

const captainMiddleware = async (req, res, next) => {
    const token = req.cookies.Token || req.header("Authorization")

    if(!token){
        return res.status(401).json({message : "Unauthorized! No token found"})
    }    

    const isBlacklist = await blacklistTokenModel.findOne({token})
    if(isBlacklist){
        return res.status(401).json({message : "Unauthorized! token is blacklisted"})
    }

    const jwtToken = token.replace("Bearer", "").trim()
        
    try {
        const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY)        

        const captains = await Captain.findOne({email : decoded.email}).select({password : 0})
        req.captain = captains
        next()

    } catch (error) {
        console.error(error)        
        return res.status(401).json({message : "Unauthorized"})
    }
}


module.exports = captainMiddleware