var path = require('path');

var express = require('express');
var cookieParser = require('cookie-parser')
var exphbs = require('express-handlebars');

var app = express();

app.use(cookieParser());

var viewsPath = path.join(__dirname, '/views');
var layoutsDir = path.resolve(path.join(viewsPath, 'layouts'));
var partialsDir = path.resolve(path.join(viewsPath, 'partials'));

app.engine('handlebars', exphbs({
  layoutsDir: layoutsDir,
  partialsDir: partialsDir,
  defaultLayout: 'main'
}));

app.set('views', path.resolve(viewsPath));
app.set('view engine', 'handlebars');

app.use('/public', express['static'](path.join(__dirname, '/public')));

app.get('/', function (req, res) {
  if (req.query.deleted) {
    if (req.query.deleted === 'authError') {
      res.locals.message = 'Can not remove your account without being authenticated';
    } else {
      res.locals.message = 'Account deleted succesfully';
    }
  } else if (req.query.auth) {
    res.locals.message = 'Authenticated succesfully';
  }

  res.render('home');
});

app.get('/auth', function (req, res) {
  res.cookie('accessToken', 'this-is-the-access-token');

  res.redirect('/?auth=true');
});

app.get('/delete-account', function (req, res) {
  if (!req.cookies.accessToken) {
    return res.redirect('/?deleted=authError')
  }

  res.render('delete');
});

app.post('/delete-account', function (req, res) {
  if (!req.cookies.accessToken) {
    return res.redirect('/?deleted=authError')
  }

  res.clearCookie('accessToken');

  res.redirect('/?deleted=true');
});

app.listen(5000);
