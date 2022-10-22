const express = require('express')
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')


// Aqui creo mi servidor de Expressjs
const app = express()
// Aqui creo mi servidor http
const httpServer = createServer(app)
// Creo mi servir de WebSockets a partir de un servidor http usando socket.io
const io = new Server(httpServer)


// dirname -> es es path del directorio que contiene el actual archivo que se esta ejecutando
// Esta linea es para decir donde quiero guardar mis archivos estaticos
app.use(express.static(path.join(__dirname, 'views')))


app.get('/', (req, res) => {
    // Cada vez que visite la ruta raiz voy a mandar esta pag html
    res.sendFile(__dirname + '/views/index.html')
})


io.on("connection", socket => {

    console.log('Clientes conectados:', io.engine.clientsCount)
    console.log('Id del socket conectado:', socket.id)

    socket.on('disconnect', () => {
        console.log('El socket' + socket.id + 'se a desconectado.')
    })

    socket.conn.once("upgrade", () => {
        console.log('Hemos pasado de HTTP Long-Polling a', socket.conn.transport.name)
    })

})


httpServer.listen(3000)