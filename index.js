const winston=require('winston');
const express=require('express');
var path = require('path');

var https = require('https');
var fs = require('fs');

const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.all('*', (req, res, next) => {
    if (req.secure) {return next();}
    else { res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url); }
  });

app.use(express.static(path.join(__dirname,'public')));
app.use('/public/images',express.static(path.join(__dirname,'public/images')));

require('./startup/logging')();
require('./startup/routes')(app);
// require('./startup/db')();
require('./startup/config')();
require('./startup/validations')();
require('./startup/prod')(app);

require('./httpsSetting/httpsSetting')(app);







