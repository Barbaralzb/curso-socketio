const express = require('express')
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { instrument } = require("@socket.io/admin-ui")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    // Esto es para que la pagina estatica admin.socket.io pueda conectarse a nuestro localhost
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

// instrument(io, {
//     auth : false
// })

instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        //field must be a valid bcrypt hash (generarla en linea)
        password: "$2a$12$BWvkCMQj3dHAVLCBFh.qpugMT/3vvNwmP3fChJFkGXjoF1o0/zSIu"
    }
});

app.use(express.static(path.join(__dirname, 'views')))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})


io.on("connection", socket => {
    socket.on('circle position', position => {
        socket.broadcast.emit('move circle', position)
    })

})

httpServer.listen(3000) 