const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 3000

const cors = require('cors')
const connectDB = require('./utils/db')
const cookieParser = require('cookie-parser')
const { initializeSocket } = require('./socket')
 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())

const userRoute = require('./routes/user-route')
const captainRoute = require('./routes/captain-route')
const mapRoute = require('./routes/map-route')
const rideRoute = require('./routes/ride-route')

app.use('/api/users', userRoute)
app.use('/api/captain', captainRoute)
app.use('/api/map', mapRoute)
app.use('/api/ride', rideRoute)

const server = http.createServer(app)

initializeSocket(server)

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Listening to server at http://localhost:${port}`) 
    })
})