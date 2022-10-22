 // <!-- Este script es para que el cliente se conecte a WebSocket -->

// La funcion io() la expone el archivo /socket.io/socket.io.js
// Y esta funcion pemrmite detectar que un user se conectó
const socket = io();

function checkSocketStatus() {
    console.log('Estado del socket:', socket.connected)
}

socket.on('connect', () => {
    console.log('el socket se ha conectado : ', socket.id)
    checkSocketStatus()
})

socket.on('connect_error', () => {
    console.log('No pude conectarme 😢')
})

socket.on('disconnect', () => {
    console.log('El usuario '+ socket.id + ' se desconecto')
    checkSocketStatus()
})

socket.io.on('reconnect_attempt', (attempt) => {
    console.log('Intento de connexion n°:', attempt)
})

socket.io.on('reconnect', () => {
    console.log('Estoy he vuelto a conectar 💪🏼')
})
