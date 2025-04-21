const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3, "First name must be atleast 3 characters"]
        },
        lastname : {
            type : String,
            required : true,
            minlength : [3, "Last name must be atleast 3 characters"]
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
    }
})

userSchema.pre('save', async function(next){
    const user = this

    if(!user.isModified("password")){
        next()
    }
   
    try {
        const hashPassword = await bcrypt.hash(user.password, 12)
        user.password = hashPassword
        next()

    } catch (error) {
        next(error)
    }
})

userSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id : this._id, email : this.email}, process.env.SECRET_KEY, {expiresIn : '24h'})

    return token
}

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User