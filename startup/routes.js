const express=require('express');

const cors=require('cors');
const error=require('../middleware/errorHandling');

const contact=require('../routes/contactRoute/contactRoute');

var path = require('path');
const upload=require('../upload-file/uploadFile');
const passport = require('passport');





module.exports=function(app)
{   
    app.use(express.json());
  
    app.use('/api/contact',contact);
    app.use(error);

}

  // app.use(passport.initialize());
    // app.use((req, res, next)=> {
    //     console.log('ddd');
    //     res.setHeader("Access-Control-Allow-Origin", "https://localhost:3443/api/contact");
    //     res.setHeader("Access-Control-Allow-Credentials", "true");
    //     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     res.setHeader("Access-Control-Allow-Methods","GET","POST","PATCH","DELETE","OPTIONS");
    //     next();
        
    // });
