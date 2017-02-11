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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
})
//
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('got it', data);
// });

//jQuery(document).ready(function($) {
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a  = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  jQuery('#messages').append(li);
})


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  })
});
//});

var locationButton =  jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location');
  })
})
