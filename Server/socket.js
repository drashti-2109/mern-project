const socketIo = require('socket.io')
const User = require('./models/user-model')
const Captain = require('./models/captain-model')

let io;

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors : {
            origin : "*",
            methods : ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected : ${socket.id}`)
    
        socket.on('join', async (data) => {
            const { userId, userType } = data

            if(userType === 'user'){
                await User.findByIdAndUpdate(userId, { socketId : socket.id })
                
            } else if(userType === 'captain') {
                await Captain.findByIdAndUpdate(userId, { socketId : socket.id })
            }
        })

        socket.on('/update-captain-location', async (data) => {
            const { userId, location } = data

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', { message : "Invalid location data" })
            }

            await Captain.findByIdAndUpdate(userId, {
                location : {
                    ltd : location.ltd,
                    lng : location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected : ${socket.id}`)
        })
    })
}

const sendMessageToSocketId = (socketId, messageObj) => {
    if(io) {
        io.to(socketId).emit(messageObj.event, messageObj.data)
    } else {
        console.log('Socket.io is not initialized')
    }
}

module.exports = { initializeSocket, sendMessageToSocketId }