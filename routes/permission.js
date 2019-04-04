
const permissions=require('../controllers/memberShipController/permissionsController')
const express=require('express');

const cors =require('../Cross-Origin-Resource/cors');


const route=express.Router();

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/',cors.cors, permissions.get);

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/:id',cors.cors,permissions.getById);

route.post('/', cors.corsWithOptions,permissions.post);
route.put('/:id', cors.corsWithOptions,permissions.put);
route.delete('/:id', cors.corsWithOptions,permissions.delete);

module.exports=route;


