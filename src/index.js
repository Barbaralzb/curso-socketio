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


// -> Esto es lo que tenia antes de trabajar con namespaces
//-> Este io hace refencia al namespace por defecto

// io.on("connection", socket => {
    // Aca escuchaba y emitia eventos
//})


// -> Aca creo los namespaces
// .of -> se conecta a un spacename en especifico
const teachers = io.of("teachers")
const students = io.of("students")

teachers.on("connection", socket => {
    socket.on("send message", data => {
        // aca lo que teniamos antes era io.emit
        // pero se llama teachers porque asi lo denomine al io que se conecta con el namespace
        teachers.emit("message", data)
    })
})

students.on("connection", socket => {
    socket.on("send message", data => {
        students.emit("message", data)
    })
})


httpServer.listen(3000)