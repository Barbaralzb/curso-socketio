// -> Este ya no lo necesito ya que me conecto al namespace por defecto.
// -> Dentro de los parentesis es donde ponemos el namespace pero como esta vacio va a tomar el por defecto
//const socket = io ()

const user = prompt("Escribe tu usuario")

const profes = ["RetaxMaster", "juandc", "GNDX"]

let socketNamespace, group;

const chat = document.querySelector("#chat")
const namespace = document.querySelector("#namespace")

// Y esta funcion pemrmite detectar que un user se conectó
// pero nosotros necesitamos trabajar con namespaces
// entonces necesitamos especificar a que namespace vamos a conectarnos
// const socket = io();
// socket.on('welcome', res => {
//     text.textContent = res
// })



if (profes.includes(user)) {
    socketNamespace = io("/teachers")
    group = "teachers"
}
else {
    socketNamespace = io("/students")
    group = "students"
}


// -> Aca yo solo tengo una instacia de sockets que va estar concetado a uno u a otro namespace

socketNamespace.on("connect", () => {
    namespace.textContent =  group
})


const sendMessage = document.querySelector("#sendMessage")
sendMessage.addEventListener("click", () => {
    const message = prompt("Escribe tu mensaje:")
    // Aca le digo que io() va a estar conectandose a "/teachers"
    socketNamespace.emit("send message", {
        message, user
    })
})

socketNamespace.on("message", messageData => {
    const { user, message } = messageData
    const li = document.createElement("li")
    li.textContent = `${user} : ${message}`

    chat.append(li)
})