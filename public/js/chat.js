var socket = io();

$(document).ready(function() {
  $('form').submit(function(){
    socket.emit('message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('message', function(data){
    $('#messages').append($('<li>').text("<" + data.name + "> " + data.message));
  });
});
