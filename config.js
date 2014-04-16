var _ = require('underscore');

module.exports = function() {
  var config = {
    database: {
      host: '127.0.0.1',
      port: 27017,
      db: 'codeforfrance',
      uri: 'mongodb://localhost:27017/codeforfrance'
    },

    github: {
      clientId: '',
      clientSecret: ''
    },

    session: {
      secret: 'codeforfranceforthewin'
    }
  };

  var devConfig = {
    github: {
      clientId: '',
      clientSecret: ''
    },
    database: {
      host: 'localhost',
      port: 27017,
      db: 'codeforfrance',
      uri: 'mongodb://localhost:27017/codeforfrance'
    },

    session: {
      secret: ''
    }
  };

  var env = process.env.NODE_ENV || 'development';
  if (env === 'development') config = _.extend(config, devConfig);
  return config;
}();
