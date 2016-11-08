var express = require("express");
var Server = require('http').Server;
var port = process.env.PORT || 80;
var mongoose = require('mongoose');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var morgan = require("morgan");
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var server = Server(app);
var io = require('socket.io')(server);

app.set("view engine", "ejs");

var sessionMiddleware = session({ secret:'poolsclosed' , resave:true , saveUninitialized:true });
require('./config/socket.js')(io, sessionMiddleware);

app.use(express.static('public')); // Static directory

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(':remote-addr :method :url :status :response-time ms'));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require('./app/routes.js')(app, passport);
require('./app/chatserver.js')(io);

server.listen(port, function() {
  console.log("Server running on port " + port + ".");
});
