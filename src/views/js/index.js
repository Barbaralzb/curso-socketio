const socket = io()

const send = document.querySelector("#send")
const disconnect = document.querySelector("#disconnect")
const reconnect = document.querySelector("#reconnect")

send.addEventListener("click" , () => {
    // si el client esta desconetado pero sigue haciendo click
    // esos clicks (que son logs) se van a inmprimir de una cuando se vuelva a conectar
    // pero no es lo deseado en este caso

    // socket.emit("is connected", "esta conectado")

    // -> Es por esto que voy a hacer una condicion antes de mandar emitir el evento
    if (socket.connected) {
        socket.emit("is connected", "esta conectado")
    }
})

disconnect.addEventListener("click" , () => {
    socket.disconnect()
})

reconnect.addEventListener("click" , () => {
    socket.connect()
})