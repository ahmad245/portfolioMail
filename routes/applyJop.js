const applyJopController=require('../controllers/applyJobsController');
const express=require('express');
const route=express.Router();

route.get('/',applyJopController.get);
//get user by job name (/api/applyJop/users?jobName="...") or all users is applys any job(/api/applyJop/users)
route.get('/users',applyJopController.getUser);
//get job by user name (/api/applyJop/jobs?userName="...") or all jobs is applys any user(/api/applyJop/jobs)
route.get('/jobs',applyJopController.getJob);
route.post('/',applyJopController.post);

module.exports=route;


    