const User = require('../models/user-model')
const blacklistTokenModel = require('../models/blackListToken-model')

const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.Token || req.header('Authorization')

    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }
        
    const isBlackList = await blacklistTokenModel.findOne({token})
    if(isBlackList){
        return res.status(401).json({message : "Unauthorized"})
    }
    
    const jwtToken = token.replace("Bearer", "").trim()
    
    try {
        const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY)        

        const users = await User.findOne({email : decoded.email}).select({password : 0}) 
        req.user = users
        
        return next()
        
    } catch (error) {
        console.error(error)
        return res.status(401).json({message : "Unauthorized"})
    }
}

module.exports = authMiddleware