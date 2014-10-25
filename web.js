var express = require('express'), superagent = require('superagent');

var port = process.env.PORT || 5000;
var OAUTH_CLIENT_ID = "138c264183219a2ac2c9";
var app = express();

app.get('/', function(request,response){
  response.send("This is an api wrapper for github's oauth api that keeps the "+
  "client_secret safe by storing it in an environment variable.  API "+
  "documentation: https://developer.github.com/v3/oauth/#web-application-flow");
})

app.post('/login/oauth/access_token', function(request, userResponse) {
  var code = request.query.code;
  superagent
    .post('https://github.com/login/oauth/access_token')
    .set('Accept', 'application/json')
    .send({
      client_id: OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code: code
    })
    .end(function(githubResponse){
      userResponse
        .set('Access-Control-Allow-Origin', '*')
        .json(githubResponse.body);
    });
});


app.listen(port);
console.log('Server started on ' + port);
