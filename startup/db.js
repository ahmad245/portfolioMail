const mongoose=require('mongoose');
const winston=require('winston')
module.exports=function(){
    mongoose.connect('mongodb://localhost/contactForm')
    .then(()=>{winston.info('connected...')})
}
