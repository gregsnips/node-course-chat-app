var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
  // socket.emit('createEmail',{
  //   to: 'jen@example.com',
  //   text: 'Hey. this is Greg.'
  // })

//****Event emitter
  // socket.emit('createMessage', { //this emits new message that server.js will listen to
  //   from: 'Jen',
  //   text: 'I am in the office'
  // })
})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

// socket.on('newEmail', function (email){
//   console.log('New email', email);
// })

//***Event listener
socket.on('newMessage', function (message) { //this listens for new message from server.js
  console.log('New message', message);
})
