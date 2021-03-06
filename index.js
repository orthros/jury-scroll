require("dotenv").config();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/control/:id', function (req, res) {
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

app.get('/api/control/:id/:message', function (req, res) {
    var responseString = '';
    if (req.params != undefined &&
        req.params.id != undefined &&
        req.params.message != undefined) {
        var id = req.params.id;
        var message = req.params.message;
        io.emit("ticker " + id, message);
        responseString = message;
    }
    res.status(200).send(responseString);
    res.end();
});

var port = process.env.PORT || 5000;

http.listen(port, function () {
    console.log('listening on *:' + port);
});