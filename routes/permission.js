
const permissions=require('../controllers/memberShipController/permissionsController')
const express=require('express');
const route=express.Router();

route.get('/',permissions.get);
route.get('/:id',permissions.getById);
route.post('/',permissions.post);
route.put('/:id',permissions.put);
route.delete('/:id',permissions.delete);

module.exports=route;


