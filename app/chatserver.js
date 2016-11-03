module.exports = function(io) {
  io.on('connection', function(socket) {
    if(socket.request.session.passport == null) socket.disconnect();
    else {
      var username = socket.request.session.passport.user.username;
      socket.on('message', function(msg) {
        io.emit('message', {name:username, message:msg});
      });
    }
  });
}
