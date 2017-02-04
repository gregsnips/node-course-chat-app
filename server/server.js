require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/..public'); The way its done now using the path node module
// console.log(publicPath);  The way things were done before

var app = express();
const port = process.env.PORT;
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath) );

io.on('connection', (socket) =>{
  console.log('new user connected');

  socket.on('disconnect', (socket) => {
    console.log('user was disconnected');
  });
});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
})


//module.exports = {app};
