var mongoose = require('mongoose');

var User = mongoose.model('User', {
  username: String,
  email: String,
  name: String,
  githubId: Number
});