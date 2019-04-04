const authenticate=require('../middleware/authenticate');

const cors =require('../Cross-Origin-Resource/cors');

const upload=require('../upload-file/uploadFile');
const jobController=require('../controllers/jobsCntroller');
const express=require('express');
const route=express.Router();


route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/',cors.cors,jobController.get);

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/:id',cors.cors,jobController.getById);

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/category/:categoryId',cors.cors,jobController.getByCategoryId);

// route.get('/categoryJop',jobController.getByCategoryJob);
route.post('/', cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyUserWriter,upload.single('jobImageUrl'), jobController.post);
route.put('/:id',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyUserWriter,jobController.put);
route.delete('/:id',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyUserWriter,jobController.delete);
module.exports=route;
