const Ride = require('../models/ride-model')
const { fetchDistanceTime } = require('../controllers/map-controller');
const rideModel = require('../models/ride-model');
const { sendMessageToSocketId } = require('../socket');

async function getFare(start, end) {
    if (!start || !end) {
        throw new Error('Start and end points are required');
    }

    const distanceTime = await fetchDistanceTime(start, end);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}

module.exports.getFare = getFare

const getOTP = (num) => {
    return Math.floor(1000 + Math.random() * 9000)
}

module.exports.createRide = async ({ 
    user, start, end, vehicleType
}) => {
    if(!user || !start || !end || !vehicleType){
        throw new Error('All fields are required');
    }

    const fare = await getFare(start, end)

    const ride = await Ride.create({
        user, 
        start, 
        end, 
        otp : getOTP(5), 
        fare : fare[vehicleType]
    })

    return ride
}

module.exports.confirmRide = async ({ rideId, captain }) => {
    if(!rideId){
        throw new Error("Ride id is required")
    }

    await rideModel.findOneAndUpdate({
        _id : rideId
    }, {  
        status : "accepted",
        captain : captain._id
    })

    const ride = await rideModel.findOne({
        _id : rideId
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error("Ride not found")
    }

    return ride
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if(!rideId || !otp){
        throw new Error("Ride id and OTP are required")
    }

    const ride = await rideModel.findOne({
        _id : rideId
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error("Ride not found")
    }

    if(ride.status !== 'accepted'){
        throw new Error("Ride not accepted")
    }

    if(ride.otp !== otp){
        throw new Error("Invalid OTP")
    }

    await rideModel.findOneAndUpdate({
        _id : rideId
    }, {  
        status : "ongoing",
    })

    sendMessageToSocketId(ride.user.socketId, {
        event : 'ride-started',
        data : ride
    })

    return ride
}

module.exports.endRide = async ({ rideId, captain }) => {
    if(!rideId){
        throw new Error("Ride id is required")
    }

    const ride = await rideModel.findOne({
        _id : rideId,
        captain : captain._id
    }).populate('user').populate('captain')

    if(!ride){
        throw new Error("Ride not found")
    }

    if(ride.status !== 'ongoing'){
        throw new Error("Ride not ongoing")
    }

    await rideModel.findOneAndUpdate({
        _id : rideId
    }, {  
        status : "completed",
    })

    return ride
}