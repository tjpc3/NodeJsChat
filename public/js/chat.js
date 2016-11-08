var socket = io();

function displayMessage(message) {
  var newMessage = $('<li>').text(message);
  $('#messages').append(newMessage);
  $('#messages-container').animate({
    scrollTop : newMessage.position().top,
  }, 100);
}

$(document).ready(function() {
  $('form').submit(function(){
    var message = $('#m').val();
    if (message.length != 0 && message.length < 1000)
      socket.emit('message', message);
    $('#m').val('');
    return false;
  });

  socket.on('connected', function(data){
    displayMessage(data.name + " has connected.");
  });

  socket.on('disconnected', function(data){
    displayMessage(data.name + " has disconnected.");
  });

  socket.on('message', function(data){
    displayMessage("<" + data.name + "> " + data.message);
  });
});
