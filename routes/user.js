const userController=require('../controllers/usersController');
const authenticate=require('../middleware/authenticate');
const passport=require('passport');

const cors =require('../Cross-Origin-Resource/cors');


const express=require('express');
const route=express.Router();

route.get('/me', cors.corsWithOptions,userController.get);

//route.post('/',userController.post);
route.post('/sign-up',cors.corsWithOptions,userController.signup);
route.post('/login',cors.corsWithOptions,passport.authenticate('local'),userController.login);
route.get('/logout',cors.corsWithOptions,userController.logout);
route.put('/:id',cors.corsWithOptions,userController.put);
module.exports=route;