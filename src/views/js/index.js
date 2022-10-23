const socket = io();

// Aca voy a escuchar lo que el servidor emitio, que es 'welcome', y su contenido lo imprimo en consola  
socket.on('welcome', res => {
    //console.log(res)
    text.textContent = res
})

const EmitToServer = document.querySelector('#emit-to-server')
EmitToServer.addEventListener('click', () => {
    socket.emit('server', 'Hola servidor')
})

socket.on('everyone', res => {
    console.log(res)
})

const EmitToLast = document.querySelector('#emit-to-last')
EmitToLast.addEventListener('click', () => {
    socket.emit('last', 'Hola last 🧚🏼')
})

socket.on('saludar', res => {
    console.log(res)
})

// Aqui puedo reflejar que mi emision ONCE que el servidor emite 3 veces
// escucha solo 1 vez cuando utilizo .once
socket.once('once', res => {
    console.log(res)
})
socket.on('once', res => {
    console.log(res)
})

const listener = () => {
    console.log("Se apaga el evento")
}

socket.on('off', listener)

setTimeout(() => {
    //en el metodo off tengo que tener el metodo en una variable para que funcione
    socket.off('off', listener)
}, 2000)