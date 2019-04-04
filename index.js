const winston=require('winston');
const express=require('express');
var path = require('path');

var https = require('https');
var fs = require('fs');

const app=express();

app.all('*', (req, res, next) => {
    if (req.secure) {return next();}
    else { res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url); }
  });

app.use(express.static(path.join(__dirname,'public')));
app.use('/public/images',express.static(path.join(__dirname,'public/images')));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validations')();

require('./httpsSetting/httpsSetting')(app);






// const port=process.env.PORT||3000;
// app.listen(port,()=>{winston.info(port)});

// app.set('secPort',port+443);



// /**
//  * Create HTTPS server.
//  */ 
 
// var options = {
//   key: fs.readFileSync(__dirname+'/private.key'),
//   cert: fs.readFileSync(__dirname+'/certificate.pem')
// };

// var secureServer = https.createServer(options,app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// secureServer.listen(app.get('secPort'), () => {
//    console.log('Server listening on port ',app.get('secPort'));
// });
// secureServer.on('error', onError);
// secureServer.on('listening', onListening);

// require('./https-setting/httpsConfig')();

// const port=process.env.PORT||3000;
// app.listen(port,()=>{winston.info(port)});



