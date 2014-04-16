var express = require('express'),
    mongoose = require('mongoose');

var app = express();

// Views
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(3000);
