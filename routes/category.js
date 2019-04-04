const authenticate=require('../middleware/authenticate');

const cors =require('../Cross-Origin-Resource/cors');

const categoryController=require('../controllers/categoryController');
const express =require('express');
const route=express.Router();

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/',cors.cors,categoryController.get);

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/:id',cors.cors,categoryController.getById);

route.post('/',cors.corsWithOptions,authenticate.verifyUser,authenticate.veryFyAdmin, categoryController.post);
route.put('/:id',cors.corsWithOptions,authenticate.verifyUser,authenticate.veryFyAdmin,categoryController.put);
route.delete('/:id',cors.corsWithOptions,authenticate.verifyUser,authenticate.veryFyAdmin,categoryController.delete)

module.exports=route;