const userController=require('../controllers/usersController');
const express=require('express');
const route=express.Router();

route.get('/me',userController.get);

route.post('/',userController.post);
module.exports=route;