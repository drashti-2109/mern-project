const rideService = require('../services/ride-service')
const mapService = require('../services/map-service')

const { validationResult } = require('express-validator')
const { sendMessageToSocketId } = require('../socket')
const rideModel = require('../models/ride-model')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(401).json({errors : errors.array()})
    }

    const { start, end, vehicleType } = req.body
    
    try {
        const ride = await rideService.createRide({ user : req.user._id, start, end, vehicleType })

        const startCoordinates = await mapService.getAddressCoordinate(start)
        const captainInRadius = await mapService.getCaptainInTheRadius(startCoordinates.ltd, startCoordinates.lng, 20)

        ride.otp = ""

        const rideWithUser = await rideModel.findById({_id : ride._id}).populate('user')

        captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event : 'new-ride',
                data : rideWithUser
            })
        })

        return res.status(200).json(ride)

    } catch (error) {        
        return res.status(500).json({message : error.message})
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    const { start, end } = req.query
    
    try {
        const fare = await rideService.getFare(start, end)

        return res.status(200).json(fare)
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const { rideId } = req.body
    
    try {
        const ride = await rideService.confirmRide({rideId, captain : req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-confirmed',
            data : ride
        })

        return res.status(200).json(ride)
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }    
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const { rideId, otp } = req.query
    
    try {
        const ride = await rideService.startRide({rideId, otp, captain : req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-started',
            data : ride
        })

        return res.status(200).json(ride)
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }    
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const { rideId } = req.body
    
    try {
        const ride = await rideService.endRide({rideId, captain : req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-ended',
            data : ride
        })

        return res.status(200).json(ride)
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }    
}