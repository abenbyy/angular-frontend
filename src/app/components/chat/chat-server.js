var io = require('socket.io')(4300);

io.on('connection', function (socket) {
    console.log("Success Connect")
    socket.on('chat-event', function (msg) {
        console.log("Msg: "+msg);
        io.emit('chat-event',msg);
    });

});