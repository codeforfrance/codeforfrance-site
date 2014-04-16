var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    auth = require('./controllers/auth'),
    config = require('./config');

// Init the server when connected to the DB
mongoose.connection.once('open', function() {
  var app = express();

  // Views
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.use(express.static(__dirname + '/public'));

  // Middlewares
  app.use(cookieParser());
  app.use(session({
    secret: config.session.secret,
    key: 'sid'
  }));

  // Routes
  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get('/auth/github', auth.githubAuthorize);
  app.get('/auth/github/callback', auth.githubCallback);

  // Start the server
  app.listen(3000, function() {
    console.log('Application listening on port 3000. Go to http://localhost:3000 to visit the website.');
  });
});

// Connect to MongoDB
console.info('Connecting to MongoDB (' + config.database.uri + ') ...');
mongoose.connect(config.database.uri);