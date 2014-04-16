var mongoose = require('mongoose');

var User = mongoose.model('User', {
  username: String,
  email: String,
  name: String,
  ghId: Number,
  ghLogin: String,
  ghAccessToken: String
});

module.exports = User;