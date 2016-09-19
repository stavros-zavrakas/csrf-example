var express = require('express');
var cookieParser = require('cookie-parser')

var app = express();

app.use(cookieParser());

app.get('/', function (req, res) {
  var msg = 'social network server';
  msg += '<br>';
 
  if (req.query.deleted) {
    if (req.query.deleted === 'authError') {
      msg += 'Can not remove your account without being authenticated';
    } else {
      msg += 'Account deleted succesfully';
    }
  } else if (req.query.auth) {
    msg += 'Authenticated succesfully';
  }

  res.send(msg);
});

app.get('/auth', function (req, res) {
  res.cookie('accessToken', 'this-is-the-access-token');

  res.redirect('/?auth=true');
});

app.get('/delete-account', function (req, res) {
  if (!req.cookies.accessToken) {
    return res.redirect('/?deleted=authError')
  }

  var form = '';
  form += '<h1>Delete your account?</h1>';
  form += '<form action="/delete-account" method="post">'
  form += '  <input type="submit" value="Delete!">'
  form += '</form>'

  res.send(form);
});

app.post('/delete-account', function (req, res) {
  if (!req.cookies.accessToken) {
    return res.redirect('/?deleted=authError')
  }

  res.clearCookie('accessToken');

  res.redirect('/?deleted=true');
});

app.listen(5000);
