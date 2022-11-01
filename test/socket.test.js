// Tenemos que crear un servidor con socket io dentro de nuestro testing

const { createServer } = require("http");
const { Server } = require("socket.io");
//Esto es para testear la parte del cliente
const Client = require("socket.io-client");


// El nombre de mi test es "Testing Socket.io"
describe("Testing Socket.io", () => {
    let io, serverSocket, clientSocket;


    // Aqui dentro se definen las funciones del test

    //Antes de hacer los test creamos el servidor -> beforeAll es el metodo de jest
    beforeAll(done => {
        // Creo mi servidor http
        const httpServer = createServer()

        // Creo mi servidor websocket
        io = new Server(httpServer)

        //Escucho a mi servidor y le paso un callback
        // Cuando mi servidor empiece a escuchar quiero hacer lo sig
        httpServer.listen(() =>{
            //Tengo que tener el puerto para que el cliente se conecte
            const port = httpServer.address().port
            // Instancia la clase client
            // conecto a un cleinte ficticio en mi servidor
            // Lo mismo que hacia al poner en el navegador locahost
            // gracias al const ocket = io() de mi index.js
            clientSocket = new Client(`http://localhost:${port}`)

            // Aca al conectarse el cliente ficticio de arriba
            //lo voy a almacenar en la variable global 'serverSocket'
            // -> esto seria servidor:  src/index.js
            io.on("connection", socket => {
                serverSocket = socket
            })

            // -> esto seria cliente:  src/view/js/index.js
            clientSocket.on("connect", done)
        })

    })

    // Al termino de los test cierro los servidores 
    afterAll(() => {
        io.close();
        clientSocket.close();
    })

    test("Test event", done => {
        clientSocket.on("greeting", greet => {
            try {
                expect(greet).toBe("hola")
                done()
            } catch (error) {
                done(error)
            }
        })
        serverSocket.emit("greeting", "hola" )
    })

    test("Testing callbacks acknolegments", done => {
        serverSocket.on("bark", callback => {
            callback("woof!")
        })
        clientSocket.emit("bark", arg =>{
            try {
                expect(arg).toBe("woof!")
                done()
            } catch (error) {
                done(err)
            }
        })
    })
})

