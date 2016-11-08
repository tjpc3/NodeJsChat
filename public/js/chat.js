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
    $('#messages').append(newMessage);
    $('#messages-container').animate({
      scrollTop : newMessage.position().top,
    }, 100);
  });
});
