const {ApplyJob,validate}=require('../model/applyJop');
const {Job}=require('../model/jobs');
const {User}=require('../model/users');
const pdf=require('../upload-file/pdf');
const pdfDocument=require('pdfkit');
const fs=require('fs');

const path=require('path');

//get All Applyjob or aggregate by userApply or userWriter or job 
module.exports.get=async(req,res)=>{
    let applyJop
    if(req.query.userJops)
    {
       applyJop=await ApplyJob.aggregate([
           {$group:{_id:{users:"$user.username"},jobs:{$push:"$job.name"}}}
       ]);
    }
    if(req.query.UsersWriter)
    {
       applyJop=await ApplyJob.aggregate([
           {$group:{_id:{users:"$job.userWriterId"},jobs:{$push:"$job.name"}}}
       ]);
    }
    if(req.query.jobUsers)
    {
       applyJop=await ApplyJob.aggregate([
           {$group:{_id:{jobs:"$job.name"},users:{$push:"$user.username"}}}
       ]);
    }
    
    else{applyJop=await ApplyJob.find().sort('-applyDate');}
    res.send(applyJop);
}
//get all users Apply this job  based on query or all user 
module.exports.getUserApply=async(req,res)=>{
    let users;
    if(req.user.isAdmin)
    {
        //by job name
        if(req.query.jobName){users=await ApplyJob.find({'job.name':req.query.jobName}).select({user:1,applyDate:1});}
        //by birthday
        if(req.query.birthday){users=await ApplyJob.find({'birthday.year':req.query.birthday}).select({user:1,applyDate:1});}
        //by experiance
        if(req.query.isExperiance){users=await ApplyJob.find({'experiance.isExperiance':req.query.isExperiance}).select({user:1,applyDate:1,experiance:1});}
        //by education
        if(req.query.isEducation){users=await ApplyJob.find({'education.isEducation':req.query.isEducation}).select({user:1,applyDate:1,experiance:1,education:1});}

        else{ users=await ApplyJob.find().select({user:1,applyDate:1});}
       
    }
    else{
        if(req.query.classification)
        {
            users=await ApplyJob.aggregate([
                {$match:{"job.userWriterId":req.user._id}},
                {$group:{_id:{jobs:"$job.name"},users:{$push:"$user.username"}}}
            ]);

        }
        else{
            
            users=await ApplyJob.find({'job.userWriterId':req.user._id});
        }
        
    }  
    if(!users)return res.status(404).send('this not found');
    res.send(users);
    
}
/////////// Job By UserId based userApply/////////////////
module.exports.getJobrByUserId=async(req,res)=>{
    
        const job=await ApplyJob.findOne({'user._id':req.params.userId});
        if(!job)return res.status(404).send('this id not found');
  
        if(job.user._id.equals(req.user._id))
        {
            res.send(job);
        }
    
   else{
    return res.status(404).send('this id not found');
   }
  
}
//get all job that apply 
module.exports.getJob=async(req,res)=>{
    // let jobs;
    // if(req.query.userName){ jobs=await ApplyJob.find({'user.username':req.query.userName}).select({job:1,applyDate:1});}
    // else if(req.query.userEmail){ jobs=await ApplyJob.find({'user.email':req.query.userEmail}).select({job:1,applyDate:1});}
//    else{
      const jobs=await ApplyJob.find().select({job:1,applyDate:1}); 
      if(!jobs)res.status(404).send('this is not found');
    res.send(jobs);
}
/////////////
module.exports.getJobById=async(req,res,next)=>{
    const job=await ApplyJob.find({'job._id':req.params.jobId});
    if(!job)return res.status(404).send('this id not found');
  res.send(job);
}
/////////////Invoise PDF/////////////
module.exports.getInvoise=async(req,res,next)=>{
    const job=await ApplyJob.findOne({'user._id':req.params.userId});
    if(!job)return res.status(404).send('this id not found');

    if(job.user._id.equals(req.user._id))
    {
        const fileName='invoise-'+job.user._id+'.pdf';
        const filePath=path.join('public','pdf',fileName);

       pdf.intialisPdf(res,filePath,fileName);
    }

else{
return res.status(404).send('this id not found');
}
}


///////POST
module.exports.post=async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    const job=await Job.findById(req.body.jobId);
    if(!job)return res.status(400).send('invalid jop');
    if(job.numberOfWanted===0)return res.status(400).send('this job not in stock');
    // const user=await User.findById(req.user._id);
    // if(!user)return res.status(400).send('invalid user');

    const applyJob=new ApplyJob({
        job:{_id:job._id,name:job.name,userWriterId:job.user._id,userWriterName:job.user.username,userWriterEmail:job.user.email},
        user:{_id:req.user._id,username:req.user.username, email:req.user.email,phone:req.user.phone},
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
            isEducation:req.body.education.isEducation,
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


    const fileName='invoise-'+job.user._id+'.pdf';
    const filePath=path.join('public','pdf',fileName);

    pdf.createPdf(res,filePath,fileName);

    res.send(applyJob);
    
    
 
}


module.exports.putJob=async(req,res,next)=>{
   const apply=await ApplyJob.findOne({_id:req.params.id});
   if(!apply)return res.status(404).send('this  not found');
    
   if(apply.user._id.equals(req.user._id))
   {
    if(req.body.gender){apply.gender=req.body.gender}
    if(req.body.birthday){apply.gender=req.body.birthday}
    if(req.body.nationality){apply.gender=req.body.nationality}
    if(req.body.dateOfgraduatin){apply.gender=req.body.dateOfgraduatin}
    if(req.body.skiling){apply.gender=req.body.skiling}
    if(req.body.languge){apply.gender=req.body.languge}
    if(req.body.education){apply.gender=req.body.education}
    if(req.body.experiance){apply.gender=req.body.experiance}
    if(req.body.stateSociety){apply.gender=req.body.stateSociety}
    if(req.body.nationality){apply.gender=req.body.nationality}
    await apply.save();
    res.send(apply);
   }
  else{
    res.status(404).send('this item not found');
  }
}
module.exports.delete=async(req,res,next)=>{
    const apply=await ApplyJob.findOne({_id:req.params.id});
    if(!apply)return res.status(404).send('this item  not found');
     
    if(apply.user._id.equals(req.user._id))
    {
        ApplyJob.findByIdAndRemove(apply._id);
        res.send(job);
    }
    else{
        res.status(404).send('this item not found');
     }
}













// const {ApplyJob,validate}=require('../model/applyJop');
// const {Job}=require('../model/jobs');
// const {User}=require('../model/users');

// //get All Applyjob or aggregate by userApply or userWriter or job 
// module.exports.get=async(req,res)=>{
//     let applyJop
//     if(req.query.userJops)
//     {
//        applyJop=await ApplyJob.aggregate([
//            {$group:{_id:{users:"$user.username"},jobs:{$push:"$job.name"}}}
//        ]);
//     }
//     if(req.query.UsersWriter)
//     {
//        applyJop=await ApplyJob.aggregate([
//            {$group:{_id:{users:"$job.userWriterId"},jobs:{$push:"$job.name"}}}
//        ]);
//     }
//     if(req.query.jobUsers)
//     {
//        applyJop=await ApplyJob.aggregate([
//            {$group:{_id:{jobs:"$job.name"},users:{$push:"$user.username"}}}
//        ]);
//     }
    
//     else{applyJop=await ApplyJob.find().sort('-applyDate');}
//     res.send(applyJop);
// }
// //get all users Apply this job  based on query or all user 
// module.exports.getUserApply=async(req,res)=>{
//     let users;
//     if(req.user.isAdmin)
//     {
//         //by job name
//         if(req.query.jobName){users=await ApplyJob.find({'job.name':req.query.jobName}).select({user:1,applyDate:1});}
//         //by birthday
//         if(req.query.birthday){users=await ApplyJob.find({'birthday.year':req.query.birthday}).select({user:1,applyDate:1});}
//         //by experiance
//         if(req.query.isExperiance){users=await ApplyJob.find({'experiance.isExperiance':req.query.isExperiance}).select({user:1,applyDate:1,experiance:1});}
//         //by education
//         if(req.query.isEducation){users=await ApplyJob.find({'education.isEducation':req.query.isEducation}).select({user:1,applyDate:1,experiance:1,education:1});}

//         else{ users=await ApplyJob.find().select({user:1,applyDate:1});}
//         res.send(users);
//     }
//     else{
//         users=await ApplyJob.find({'job.userWriterId':req.user_id});
//     }   
// //     let users;
// //     //by job name
// //     if(req.query.jobName){users=await ApplyJob.find({'job.name':req.query.jobName}).select({user:1,applyDate:1});}
// //     //by birthday
// //     if(req.query.birthday){users=await ApplyJob.find({'birthday.year':req.query.birthday}).select({user:1,applyDate:1});}
// //    //by experiance
// //    if(req.query.isExperiance){users=await ApplyJob.find({'experiance.isExperiance':req.query.isExperiance}).select({user:1,applyDate:1,experiance:1});}
// //    //by education
// //    if(req.query.isEducation){users=await ApplyJob.find({'education.isEducation':req.query.isEducation}).select({user:1,applyDate:1,experiance:1,education:1});}
 
// //     else{ users=await ApplyJob.find().select({user:1,applyDate:1});}
// //     res.send(users);
// }
// /////////// Job By UserId based userApply/////////////////
// module.exports.getJobrByUserId=async(req,res)=>{
//      if(req.user._id.equals(req.params.userId))
//      {
//         const job=await ApplyJob.find({'user._id':req.user_id}).select({job:1,applyDate:1});
//         if(!job)return res.status(404).send('this id not found');
//      }
//    else{
//     return res.status(404).send('this id not found');
//    }
//   res.send(job);
// }
// //get all job that apply 
// module.exports.getJob=async(req,res)=>{
//     // let jobs;
//     // if(req.query.userName){ jobs=await ApplyJob.find({'user.username':req.query.userName}).select({job:1,applyDate:1});}
//     // else if(req.query.userEmail){ jobs=await ApplyJob.find({'user.email':req.query.userEmail}).select({job:1,applyDate:1});}
// //    else{
//       const jobs=await ApplyJob.find().select({job:1,applyDate:1}); 
//       if(!jobs)res.status(404).send('this is not found');
//     res.send(jobs);
// }
// /////////////
// module.exports.getJobById=async(req,res,next)=>{
//     const job=await ApplyJob.find({'job._id':req.params.jobId});
//     if(!job)return res.status(404).send('this id not found');
//   res.send(job);
// }
// // module.exports.getJobForUserWriter=async(req,res,next)=>{
// //     if(req.user._Id.equals(req.params.userId))
// //     {
// //         const jobs=await ApplyJob.find({'job.userWriterId':req.user._Id}).select({job:1});
// //         if(!jobs)return res.status(404).send('this id not found');
// //     }
// //     else{
// //         return res.status(404).send('this id not found');
// //     }
// //     res.send(jobs);
// // }
// ///////POST
// module.exports.post=async(req,res)=>{
//     const {error}=validate(req.body);
//     if(error)return res.status(400).send(error.details[0].message);
    
//     const job=await Job.findById(req.body.jobId);
//     if(!job)return res.status(400).send('invalid jop');
//     if(job.numberOfWanted===0)return res.status(400).send('this job not in stock');
//     // const user=await User.findById(req.user._id);
//     // if(!user)return res.status(400).send('invalid user');

//     const applyJob=new ApplyJob({
//         job:{_id:job._id,name:job.name,userWriterId:job.user._id,userWriterName:job.user.username,userWriterEmail:job.user.email},
//         user:{_id:req.user._id,username:req.user.username, email:req.user.email,phone:req.user.phone},
//         gender:req.body.gender,
//         birthday:{
//             day:req.body.birthday.day,
//             month:req.body.birthday.month,
//             year:req.body.birthday.year,
//         },
//         nationality:req.body.nationality,
//         stateSociety:req.body.stateSociety,
//         experiance:{
//         isExperiance:req.body.experiance.isExperiance ,
//         yearOfEXperiance:req.body.experiance.yearOfEXperiance,
//         monthOfExperiance:req.body.experiance.monthOfExperiance,},
//         company:{
//             companyName:req.body.company.companyName,
//             companyDepartment:req.body.company.companyDepartment, },
//         education:{
//             isEducation:req.body.education.isEducation,
//             educationName:req.body.education.educationName,
//             imageOfEducationDegree:req.body.education.imageOfEducationDegree,
//             educationspecialization:req.body.education.educationspecialization,},
//         dateOfgraduatin:{
//             dateOfgraduatingMonth:req.body.dateOfgraduatin.dateOfgraduatingMonth,
//             dateOfgraduatingYear:req.body.dateOfgraduatin.dateOfgraduatingYear,
//             countryOfgraduating:req.body.dateOfgraduatin.countryOfgraduating,
//             graduationRate:req.body.dateOfgraduatin.graduationRate,},
//         skiling:req.body.skiling,
//         languge:req.body.languge    
//     });
//     await applyJob.save();
//     job.numberOfWanted--;
//     await job.save();
//     res.send(applyJob);
// }


// module.exports.putJob=async(req,res,next)=>{
//    const apply=await ApplyJob.findOne({_id:req.params.id});
//    if(!apply)return res.status(404).send('this  not found');
    
//    if(apply.user._id.equals(req.user._id))
//    {
//     if(req.body.gender){apply.gender=req.body.gender}
//     if(req.body.birthday){apply.gender=req.body.birthday}
//     if(req.body.nationality){apply.gender=req.body.nationality}
//     if(req.body.dateOfgraduatin){apply.gender=req.body.dateOfgraduatin}
//     if(req.body.skiling){apply.gender=req.body.skiling}
//     if(req.body.languge){apply.gender=req.body.languge}
//     if(req.body.education){apply.gender=req.body.education}
//     if(req.body.experiance){apply.gender=req.body.experiance}
//     if(req.body.stateSociety){apply.gender=req.body.stateSociety}
//     if(req.body.nationality){apply.gender=req.body.nationality}
//     await apply.save();
//     res.send(apply);
//    }
//   else{
//     res.status(404).send('this item not found');
//   }
// }
// module.exports.delete=async(req,res,next)=>{
//     const apply=await ApplyJob.findOne({_id:req.params.id});
//     if(!apply)return res.status(404).send('this item  not found');
     
//     if(apply.user._id.equals(req.user._id))
//     {
//         ApplyJob.findByIdAndRemove(apply._id);
//         res.send(job);
//     }
//     else{
//         res.status(404).send('this item not found');
//      }
// }