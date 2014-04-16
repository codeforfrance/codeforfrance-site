/**
 * Authentication controller
 */

 var qs = require('querystring'),
     config = require('../config'),
     request = require('request');

// Redirect to GitHub to ask authorization for the app
exports.githubAuthorize = function(req, res) {
  var authorizeUrl = 'https://github.com/login/oauth/authorize';

  var authParams = qs.stringify({
    client_id: config.github.clientId,
    scope: 'user'
  });
  // TODO: generate state to check after callback

  res.redirect('https://github.com/login/oauth/authorize?' + authParams);
};

// Callback called after GitHub authorization
exports.githubCallback = function(req, res) {
  var code = req.query.code;

  // Get an access token
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';

  request.post({
    url: accessTokenUrl,
    qs: {
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret,
      code: code
    },
    headers: { 'Accept': 'application/json' }
  }, function(err, response, body) {
    body = JSON.parse(body);

    if (err || body.error) {
      console.error('Error while authenticating with GitHub: ', err || body.error);
      return res.redirect('/?auth=error');
    } else {
      // Save the access token and get the user profile
      var accessToken = body.access_token;

      request.get({
        url: 'https://api.github.com/user/emails',
        headers: {
          'Authorization': 'token ' + accessToken,
          'User-Agent': 'Node.js codeforfrance'
        }
      }, function(err, response, body) {
        if (err) {
          console.error('Error while getting user info.');
          return res.redirect('/');
        }

        user = JSON.parse(body);

        res.redirect('/?auth=success');
      });
    }
  });
};