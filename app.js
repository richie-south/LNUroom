'use strict';

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  const clear = require('clear');
  clear();
  clear();
}

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('express').Router();
const register = require('./models/handelbars/registerHelpers');

const app = express();
const port = 3334;

app.engine('.hbs', exphbs({
  extname: '.hbs',
  partialsDir: __dirname + '/public/partials',
  layoutsDir: __dirname + '/public/layouts'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'/public/layouts'));

app.set('json spaces', 2);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

// site
app.use('/', require('./routes/site/index'));
app.use('/', require('./routes/site/room'));

// api
app.use('/api/room', require('./routes/api/room'));

app.use(function(req, res, next) {
  res.status(404).send('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500');
});

const server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});
