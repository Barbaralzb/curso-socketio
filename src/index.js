const express = require('express')
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')


const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)


app.use(express.static(path.join(__dirname, 'views')))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})


io.on("connection", socket => {

    // voy a crear una propiedad llamada 'connectdRoom'
    // que hara que el socket se conecte y este en ninguna sala
    // que actualizare cuando se conecte a alguna sala en mi switch
    socket.connectdRoom = ""


    // room es lo que envie del evento 'connect to room' en el cliente
    socket.on('connect to room', room => {
        switch (room) {
            case 'room1':
                // Join -> que meta al socket al una sala
                // Si la sala no existe la va a crear
                socket.join('room1')
                socket.connectdRoom = "room1"
                break;
            case 'room2':
                socket.join('room2')
                socket.connectdRoom = "room2"
                break;
            case 'room3':
                socket.join('room3')
                socket.connectdRoom = "room3"
                break;
        }
    })

    socket.on('mesasge', message => {
        console.log('aca esta el mensaje', message);
        // Tengo que saber en que sala estoy para mandalo a esa sala
        const room = socket.connectdRoom
        io.to(room).emit("send message", {
            message,
            room
        })
    })

})


httpServer.listen(3000)