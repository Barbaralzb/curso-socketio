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

// Middleware para determinar si esta autenticado a no
io.use( (socket, next) => {
    // usualmente los token vienen aqui
    const token = socket.handshake.auth.token

    if (token == "Barbara Lizama") {
        next();
    }
    else {
        // Error es un objeto

        const err = new Error("No puedes pasar")
        err.data = {
            details : "No pudiste ser autenticado"
        }
        next(err)
    }
})

io.on("connection", socket => {
    console.log(socket.id);
})

httpServer.listen(3000) 