const express = require('express')
const router = express.Router()
const { body, query } = require('express-validator')

const rideController = require('../controllers/ride-controller')
const authMiddleware = require('../middlewares/auth-middleware')
const captainMiddleware = require('../middlewares/captain-middleware')

router.post('/create' ,
            authMiddleware,    
            body('start').isString().isLength({ min: 3 }).withMessage("Invalid start point"),
            body('end').isString().isLength({ min: 3 }).withMessage("Invalid end point"),
            body('vehicleType').isString().isIn(["car", "moto", "auto"]).withMessage("Invalid vehicle type"),
            rideController.createRide
        )

router.get('/get-fare', 
            authMiddleware,
            query('start').isString().isLength({ min: 3 }).withMessage("Invalid start point"),
            query('end').isString().isLength({ min: 3 }).withMessage("Invalid end point"),
            rideController.getFare  
        )        

router.post('/confirm',
            captainMiddleware,
            body('rideId').isMongoId().withMessage("Invalid ride id"),
            rideController.confirmRide    
        )       
        
router.get('/start-ride',
            captainMiddleware,
            query('rideId').isMongoId().withMessage("Invalid ride id"),
            query('otp').isString().isLength({ min: 4, max: 4 }).withMessage("Invalid otp"),
            rideController.startRide    
        )       
        
router.post('/end-ride',
            captainMiddleware,
            body('rideId').isMongoId().withMessage("Invalid ride id"),
            rideController.endRide    
        )        
        

module.exports = router