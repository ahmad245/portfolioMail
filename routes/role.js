const roles=require('../controllers/memberShipController/rolesController')
const express=require('express');

const cors =require('../Cross-Origin-Resource/cors');

const route=express.Router();

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/',cors.cors, roles.get);

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/:id',cors.cors, roles.getById);

route.post('/',cors.corsWithOptions,roles.post);
route.put('/:id',cors.corsWithOptions,roles.put);
route.delete('/:id',cors.corsWithOptions,roles.delete);

module.exports=route;