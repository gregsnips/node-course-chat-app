require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/..public'); The way its done now using the path node module
// console.log(publicPath);  The way things were done before

var app = express();
const port = process.env.PORT;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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

socket.on('join', (params, callback) => {
   if (!isRealString(params.name) || !isRealString(params.room)) {
     return callback('Name and room name are required.');
   }

   socket.join(params.room);
   users.removeUser(socket.id);
   users.addUser(socket.id, params.name, params.room);

    //socket.leave('the office fans');

    //io.emit -> io.to('The Office Fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The office fans').emit
    //socket.emit


    //***Event emitter
    //Challenge
    //Socket.emit message from: Admin, text Welcome to the chat app
    //this emits new message that index.html/js will listen to
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //Socket.broadcast.emit, from dmin text New user joined
    //this emits new message that index.html/js will listen to
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

   callback();
})

  //***Event listener
  socket.on('createMessage', (newMessage, callback) =>{ //this listens for new message from index.html/js
    console.log('creatMessage', newMessage);
    //socket.emit emits event to a single connection while io.emit emits to all connections.
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
 /*Below is another way to emit message using broadcast which sends message to everyone except for the user sending the message*/
  // socket.broadcast.emit('newMessage', {
  //        from: newMessage.from,
  //        text: newMessage.text,
  //        createdAt: new Date().getTime()
  // })
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })

  socket.on('disconnect', () => {
    //console.log('user was disconnected');
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});



server.listen(port, () => {
  console.log(`Started on port ${port}`);
})


//module.exports = {app};
