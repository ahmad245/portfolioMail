const categoryController=require('../controllers/categoryController');
const express =require('express');
const route=express.Router();

route.get('/',categoryController.get);
route.get('/:id',categoryController.getById);
route.post('/',categoryController.post);
route.put('/:id',categoryController.put);
route.delete('/:id',categoryController.delete)

module.exports=route;