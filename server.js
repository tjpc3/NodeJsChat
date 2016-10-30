var express = require("express");
var app = express();
var port = 80;
var mongoose = require('mongoose');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var morgan = require("morgan");
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({ secret:'poolsclosed' , resave:true , saveUninitialized:true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require("./app/routes.js")(app, passport);

app.listen(port, function() {
  console.log("Server running on port " + port + ".");
});
