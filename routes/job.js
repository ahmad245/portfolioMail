const jobController=require('../controllers/jobsCntroller');
const express=require('express');
const route=express.Router();


route.get('/',jobController.get);

route.get('/:id',jobController.getById);
//route.get('/categoryJop',jobController.getByCategoryJobs);
route.post('/',jobController.post);
route.put('/:id',jobController.put);
route.delete('/:id',jobController.delete);
module.exports=route;
