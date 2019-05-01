const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443','http://localhost:4200'];


  var corsOptionsDelegate = function (req, callback) {
    console.log(req.header('Origin'));
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }


exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);