module.exports = function(io, sessionMiddleware) {
  io.use(function(socket, next) {
      sessionMiddleware(socket.request, socket.request.res, next);
  });
}
