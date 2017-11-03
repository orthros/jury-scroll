require("dotenv").config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/view/:id', function (req, res) {
    res.sendFile(__dirname + '/views/view.html');
});

io.on('connection', function (socket) {
    socket.on('ticker update', function (msg) {
        //msg should be of form { id, update }
        io.emit("ticker " + msg.id, msg.update);
    })
});

var port = process.env.PORT || 5000;

http.listen(port, function () {
    console.log('listening on *:' + port);
});