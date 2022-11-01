const socket = io({
    auth : {
        token : "Barbara"
    }
});

// En caso de error en el middleware
socket.on("connect_error", err => {
    console.log("Error de connexion")
    console.log(err.message)
    console.log(err.data.details)
})