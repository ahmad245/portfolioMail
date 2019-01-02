const winston=require('winston');
const express=require('express');
const app=express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validations')();

const port=process.env.PORT||3000;
app.listen(port,()=>{winston.info(port)});
