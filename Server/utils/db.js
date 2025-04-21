const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri)

        console.log("DB connection successfull")
        
    } catch (error) {
        console.error(error)
        console.log("DB connection failed")
    }
}

module.exports = connectDB