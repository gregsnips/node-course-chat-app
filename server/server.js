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

  // socket.emit('newEmail', {
  //   from: 'gregsnips@example.com',
  //   text: 'Hey, what is going on?',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) =>{
  //   console.log('createEmail', newEmail);
  // })


 //***Event emitter
  // socket.emit('newMessage', {  //this emits new message that index.html/js will listen to
  //   from: 'Greg',
  //   text: 'Where are you?',
  //   createdAt: 123
  // })

  //***Event listener
  socket.on('createMessage', (newMessage) =>{ //this listens for new message from index.html/js
    console.log('creatMessage', newMessage);
    io.emit('newMessage', { //socket.emi emits event to a single connection while io.emit emits to all connections.
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
   });

  })

  socket.on('disconnect', (socket) => {
    console.log('user was disconnected');
  });
});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
})


//module.exports = {app};
