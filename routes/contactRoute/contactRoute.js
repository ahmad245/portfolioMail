const cors =require('../../Cross-Origin-Resource/cors');
const contactController=require('../../controllers/contactController/contactController');
const express =require('express');
const route=express.Router();


route.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.post('/',cors.corsWithOptions
, contactController.post);

module.exports=route;