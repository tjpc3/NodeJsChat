module.exports = function(io) {
  io.on('connection', function(socket) {
    if(socket.request.session.passport == null)
      socket.disconnect();
    else {
      var username = socket.request.session.passport.user.username;
      io.emit('connected', {name:username});
      socket.on('message', function(msg) {
        if (msg.length != 0 && msg.length < 700)
          io.emit('message', {name:username, message:msg});
      });
      socket.on('disconnect', function() {
        io.emit('disconnected', {name:username});
      });
    }
  });
}
