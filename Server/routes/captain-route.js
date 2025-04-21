const express = require('express')
const router = express.Router()

const captainController = require('../controllers/captain-controller')
const captainMiddleware = require('../middlewares/captain-middleware')

const { body } = require('express-validator')

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be atleast 3 charcters long"),
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be atleast 6 charcters long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Color must be atleast 3 charcters long"),
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Plate must be atleast 3 charcters long"),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage("Capacity must be atleast 1"),
    body('vehicle.vehicleType').isIn([ "car", "motorcycle", "auto" ]).withMessage("Invalid vehicle type"),

], captainController.captainRegister)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be atleast 6 charcters long"),
], captainController.captainLogin)

router.get('/profile', captainMiddleware, captainController.getCaptainProfile)

router.get('/logout', captainMiddleware, captainController.logoutCaptain)

module.exports = router