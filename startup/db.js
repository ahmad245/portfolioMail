const mongoose=require('mongoose');
const winston=require('winston')
module.exports=function(){
    mongoose.connect('mongodb://localhost/JobOffer')
    .then(()=>{winston.info('connected...')})
}
