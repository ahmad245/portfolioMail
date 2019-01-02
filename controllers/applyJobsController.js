const {ApplyJob,validate}=require('../model/applyJop');
const {Job}=require('../model/jobs');
const {User}=require('../model/users');
module.exports.get=async(req,res)=>{
    const applyJop=await ApplyJob.find().sort('-applyDate');
    res.send(applyJop);
}
module.exports.getUser=async(req,res)=>{
    let users;
    if(req.query.jobName){users=await ApplyJob.find({'job.name':req.query.jobName}).select({user:1,applyDate:1});}
    else{ users=await ApplyJob.find().select({user:1,applyDate:1});}
    res.send(users);
}
module.exports.getJob=async(req,res)=>{
    let jobs;
    if(req.query.userName){ jobs=await ApplyJob.find({'user.name':req.query.userName}).select({job:1,applyDate:1});}
    else if(req.query.userEmail){ jobs=await ApplyJob.find({'user.email':req.query.userEmail}).select({job:1,applyDate:1});}
   else{jobs=await ApplyJob.find().select({job:1,applyDate:1});}  
    res.send(jobs);
}
module.exports.post=async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    const job=await Job.findById(req.body.jobId);
    if(!job)return res.status(400).send('invalid jop');
    if(job.numberOfWanted===0)return res.status(400).send('this job not in stock');
    const user=await User.findById(req.body.userId);
    if(!user)return res.status(400).send('invalid user');

    const applyJob=new ApplyJob({
        job:{_id:job._id,name:job.name},
        user:{_id:user._id,name:user.name, email:user.email,phone:user.phone},
        gender:req.body.gender,
        birthday:{
            day:req.body.birthday.day,
            month:req.body.birthday.month,
            year:req.body.birthday.year,
        },
        nationality:req.body.nationality,
        stateSociety:req.body.stateSociety,
        experiance:{
        isExperiance:req.body.experiance.isExperiance ,
        yearOfEXperiance:req.body.experiance.yearOfEXperiance,
        monthOfExperiance:req.body.experiance.monthOfExperiance,},
        company:{
            companyName:req.body.company.companyName,
            companyDepartment:req.body.company.companyDepartment, },
        education:{
            educationName:req.body.education.educationName,
            imageOfEducationDegree:req.body.education.imageOfEducationDegree,
            educationspecialization:req.body.education.educationspecialization,},
        dateOfgraduatin:{
            dateOfgraduatingMonth:req.body.dateOfgraduatin.dateOfgraduatingMonth,
            dateOfgraduatingYear:req.body.dateOfgraduatin.dateOfgraduatingYear,
            countryOfgraduating:req.body.dateOfgraduatin.countryOfgraduating,
            graduationRate:req.body.dateOfgraduatin.graduationRate,},
        skiling:req.body.skiling,
        languge:req.body.languge    
    });
    await applyJob.save();
    job.numberOfWanted--;
    await job.save();
    res.send(applyJob);
}