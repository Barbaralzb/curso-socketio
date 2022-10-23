const express = require('express')
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')


const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)


app.use(express.static(path.join(__dirname, 'views')))

const socketsOnline = []


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})


io.on("connection", socket => {

    socketsOnline.push(socket.id)

    // Voy a emitir un evento que llamare 'welcome' con un texto como contenido
    socket.emit('welcome', 'Ahora estas conectado 👽')

    // A aca me comunico solo con el SOCKET 
    socket.on('server', res => {
        console.log(res)
    })

    // Aca emito un evento a todos gracias a IO
    io.emit('everyone', socket.id + 'se a conectado')

    // Gestionar un evento al ultimo socket que se conecto
    socket.on('last', message => {
        const lastSocket = socketsOnline[ socketsOnline.length - 1 ];
        io.to(lastSocket).emit('saludar', message)
    })

    // on -> podemos escuchar un evento que se emite varias veces
    // once -> solo 1 vez
    // off -> se usa para dejar de escuchar un evento

    socket.emit('once', 'holi')
    socket.emit('once', 'holi')
    socket.emit('once', 'holi')

    socket.emit('off', 'holi')
    // Aca emito el evento off despues de 3 seg pero no se va a ejecutar ya que lo apagamos en el cliente
    setTimeout(() => {
        socket.emit('off', 'holi')
    }, 3000)

})




httpServer.listen(3000)