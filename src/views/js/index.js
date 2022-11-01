const socket = io();

const circle = document.querySelector('#circle')

const drag = e => {
    const position = {
        top : e.clientY  + 'px',
        left : e.clientX + 'px'
    }

    drawCircle(position)
    console.log("se envia el evento al servidor")
    // los eventos volatiles no se alamancena en el buffer
    socket.volatile.emit('circle position', position)

}

const drawCircle = position => {
    circle.style.left = position.left
    circle.style.top = position.top
}

document.addEventListener('mousedown', e =>  {
    document.addEventListener('mousemove', drag)
})

document.addEventListener('mouseup', e =>  {
    document.removeEventListener('mousemove', drag)
})

// ->Aca mis eventos js dependen del servidor. Hay que cambiarlo por lo de abajo !!
// socket.on('move circle', position => {
//     circle.style.left = position.left
//     circle.style.top = position.top
// })

// -> Entonces paso a esto
socket.on('move circle', position => {
    drawCircle(position)
})