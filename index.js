var request = require('request');
var config = require('./config/prod');

exports.handler = function(event, context) {
  var form = {
    client_id: config.client_id,
    client_secret: config.client_secret
  }

  if (event.redirect_uri !== '') {
    form.grant_type = 'authorization_code';
    form.redirect_uri = event.redirect_uri;
    form.code = event.code;
  } else {
    form.grant_type = 'refresh_token';
    form.refresh_token = event.refresh_token;
  }

  request.post({ url: config.host, form: form }, function(err, httpResponse, body) {
    if (err) {
      console.log(err);
      context.succeed(err);
    } else {
      console.log(body);
      context.succeed(JSON.parse(body));
    }
  });
}
