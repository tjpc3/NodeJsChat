var express = require("express");
var app = express();
var port = 80;
var mongoose = require('mongoose');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

app.get("/", function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send('Hello World!\n');
});

app.listen(port, 'localhost', function() {
  console.log("Server running on port " + port + ".");
});
