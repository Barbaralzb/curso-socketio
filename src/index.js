const express = require('express')
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')


const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, 'views')))


app.get('/', (req, res) => {
    // Cada vez que visite la ruta raiz voy a mandar esta pag html
    res.sendFile(__dirname + '/views/index.html')
})


io.on("connection", socket => {
    socket.on("is connected", msg => {
        console.log(msg);
    })
})



httpServer.listen(3000)