var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static("public"));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log("INTRUDAHHH! " + socket.id)

    socket.on("input", data => {
        socket.broadcast.emit("input", data);
        console.log("STOP HIM AHH: ", data.text);
        console.log(data.color)
        console.log(data.font)
    })
})


console.log("SUCK ET!")