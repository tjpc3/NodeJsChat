function displayMessage(message) {
    var newMessage = $('<li>').text(message);
    $('#messages').append(newMessage);
    $('#messages-container').animate({
        scrollTop: newMessage.position().top,
    }, 100);
}

$(document).ready(function() {
    var socket = io();
    var isTyping = false;
    var typingArr = [];

    $('form').submit(function() {
        var message = $('#m').val();
        if (message.length != 0 && message.length < 1000)
            socket.emit('message', message);
        $('#m').val('');
        return false;
    });

    socket.on('connected', function(data) {
        displayMessage(data.name + " has connected.");
    });

    socket.on('disconnected', function(data) {
        displayMessage(data.name + " has disconnected.");
    });

    socket.on('message', function(data) {
        displayMessage("<" + data.name + "> " + data.message);
    });

    socket.on('typing', function(data) {
        if (data.typing = true)
            typingArr.append(data.name);
        else {
            var index = typingArr.indexOf(5);
            if (index > -1) {
                typingArr.splice(index, 1);
            }
        }

        var typingMessage = "";
        for (var i = 0; i < typingArr.length; i++) {
          if (i = typingArr.length - 1) {
            typingMessage += typingArr[i];
          } else {
            typingMessage += typingArr[i] + ", ";
          }
        }
        typingMessage += " are typing.";
        $('#typing').val(typingMessage);
    });

    setInterval(function() {
        if ($('#m').val() != "") {
            if (!isTyping) {
                socket.emit("typing", {
                    typing: true
                });
                isTyping = true;
            }
        } else {
            if (isTyping) {
                socket.emit("typing", {
                    typing: false
                });
                isTyping = false;
            }
        }
    }, 500);
});
