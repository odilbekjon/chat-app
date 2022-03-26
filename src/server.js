const express = require('express')
const app = express()
const { Server } = require('socket.io')
const PORT = process.env.PORT || 5000


app.use(express.static(__dirname + "/public"))

const server =  app.listen(PORT, console.log(PORT))

const io = new Server(server)

io.on('connection', socket => {
    socket.on('new-user', data => {
        socket.broadcast.emit('joined-user', data)
    })


    socket.on('message', data => {
        socket.broadcast.emit('new-message', data)
    })

})