var express = require('express'),
    mongoose = require('mongoose');


var app = express();

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(3000);
