var socket = io();

$(document).ready(function() {
  $('form').submit(function(){
    var message = $('#m').val();
    if (message.length != 0 && message.length < 1000)
      socket.emit('message', message);
    $('#m').val('');
    return false;
  });

  socket.on('message', function(data){
    var newMessage = $('<li>').text("<" + data.name + "> " + data.message);
    newMessage[0].scrollTop = newMessage[0].scrollHeight;
    $('#messages').append(newMessage);
  });
});
