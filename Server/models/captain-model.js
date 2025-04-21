const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3, "First name must be atleast 3 characters long"]
        },
        lastname : {
            type : String,
            minlength : [3, "Last name must be atleast 3 characters long"]
        },
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email already exists"]
    },
    password : {
        type : String,
        required : true,
    },
    socketId : {
        type : String
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive"
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            minlength : [3, "Color name must be atleast 3 characters long"]
        },
        plate : {
            type : String,
            required : true,
            minlength : [3, "Plate name must be atleast 3 characters long"]
        },
        capacity : {
            type : Number,
            required : true,
            min : [1, "Capacity must be atleast 1"]
        },
        vehicleType : {
            type : String,
            required : true,
            enum : ["car", "motorcycle", "auto"]
        }
    },
    location : {
        ltd : {
            type : Number
        },
        lng : {
            type : Number
        }
    }
})

captainSchema.pre('save', async function(next){
    const captain = this

    if(!captain.isModified("password")){
        next()
    }
   
    try {
        const hashPassword = await bcrypt.hash(captain.password, 12)
        captain.password = hashPassword
        next()

    } catch (error) {
        next(error)
    }
})

captainSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id : this._id, email : this.email}, process.env.SECRET_KEY, {expiresIn : '24h'})

    return token
}

captainSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const Captain = mongoose.model('captain', captainSchema)

module.exports = Captain