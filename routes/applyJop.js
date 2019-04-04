const authenticate=require('../middleware/authenticate');

const applyJopController=require('../controllers/applyJobsController');

const cors =require('../Cross-Origin-Resource/cors');

const express=require('express');
const route=express.Router();

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/',cors.cors,authenticate.verifyUser,authenticate.veryFyAdmin,applyJopController.get);

//get user by job name (/api/applyJop/users?jobName="...") or all users is applys any job(/api/applyJop/users)
route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/users',cors.cors,authenticate.verifyUser,authenticate.verfiyWriterOrAdmin,applyJopController.getUserApply);

//get job by userId
route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/users/:userId',cors.cors,authenticate.verifyUser,applyJopController.getJobrByUserId);

//get job by user name (/api/applyJop/jobs?userName="...") or all jobs is applys any user(/api/applyJop/jobs)
 route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
 .get('/jobs',cors.cors,authenticate.verifyUser,authenticate.veryFyAdmin,applyJopController.getJob);

route.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/jobs/:jobId',cors.cors,authenticate.verifyUser,authenticate.veryFyAdmin,applyJopController.getJobById);

route.post('/',cors.corsWithOptions,authenticate.verifyUser,applyJopController.post);

route.put('/:id',cors.corsWithOptions,authenticate.verifyUser,applyJopController.putJob);

route.delete('/:id',cors.corsWithOptions,authenticate.verifyUser,applyJopController.delete)

module.exports=route;


    