const roles=require('../controllers/memberShipController/rolesController')
const express=require('express');
const route=express.Router();

route.get('/',roles.get);
route.get('/:id',roles.getById);
route.post('/',roles.post);
route.put('/:id',roles.put);
route.delete('/:id',roles.delete);

module.exports=route;