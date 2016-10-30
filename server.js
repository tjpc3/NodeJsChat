var express = require("express");
var app = express();
var port = 80;
var mongoose = require('mongoose');
mongoose.connect(' mongodb://root:root@ds139267.mlab.com:39267/nodejschat');

app.get("/", function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send('Hello World!\n');
});

app.listen(port, 'localhost', function() {
  console.log("Server running on port " + port + ".");
});
