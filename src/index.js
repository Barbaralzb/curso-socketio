//process.env.DEBUG = "*"
process.env.DEBUG = "engine, socket.io.socket"

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
    //  -> De esta forma emito un evento a todos los clientes conectador incluyendome (al socket conectado)

    // socket.on('circle position', position => {
    //     io.emit('move circle', position)
    // })


    // Esto sirve por si se cae el servidor (o problemas de coneccion) pueda el cliente seguir interactuando
    socket.on('circle position', position => {
        socket.broadcast.emit('move circle', position)
    })

})

httpServer.listen(3000) 