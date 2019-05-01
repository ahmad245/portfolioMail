const helment=require('helmet');
const compression=require('compression');

module.exports=function(app){
    app.use(helment());
    app.use(compression());
}


