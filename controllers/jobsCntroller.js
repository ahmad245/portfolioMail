const {Job,validate}=require('../model/jobs');
const {Category}=require('../model/category');
const {User}=require('../model/users');


module.exports.get=async(req,res)=>{
    let job;
////////search for job using index Text 
     if(req.query.name){job=await Job.find(
        {$text:{$search:req.query.name}},
        {score:{$meta:"textScore"}})
        .sort({score:{$meta:"textScore"}});}
///////Get all job groubed with category and get name ,content ,companyName,companyInfo    
    else if(req.query.categoryJop){job=await Job.aggregate([
        {$group:{_id:{category:"$category.name"},Jobs:{$push:{name:"$name",content:"$content",companyName:"$user.companyName",companyInfo:"$companyInfo"}}}}])}  
///////Get jobs and groubed with userId for this user and get name and content
    else if(req.query.userJobCategory)
    {  job=await Job.aggregate([
            {$match:{"$user.username": req.query.userJobCategory}},
            {$group:{_id:{category:"$category.name"},Jobs:{$push:{name:"$name",content:"$content"}}}}]);
    } 
///////Get all job for this userName 
    else if(req.query.userName){job=await Job.find({'user.username':req.query.userName});}
//////////////Get all job for this userEmail
    else if(req.query.userEmail){job=await Job.find({'user.email':req.query.userEmail});}
///////Get all job for this userId
    else if(req.query.userId){job=await Job.find({'user._id':req.query.userId});}

//////get All job and sorted with name    
    else{job=await Job.find().sort('name');}

    res.send({jobs:job,querys:req.query});
}
/////////////////////////////////Get Job By Id//////////////////////////////////////////////////////////////
module.exports.getById=async(req,res)=>{
    const job=await Job.findById(req.params.id);
  if(!job)return res.status(404).send('this id not found');
  res.send(job);
}
//////////////////////////////////Get All Job With CategoryId/////////////////////////////////////////////////////////////
module.exports.getByCategoryId=async(req,res,next)=>{
 const job=await Job.find({'category._id':req.params.categoryId});
 if(!job)return res.status(404).send('this Job With categoryId not found');
 res.send(job);
}

//////////////////////////////Add Job/////////////////////////////////////////////////////////////////
module.exports.post=async(req,res)=>{
    let imageJob , imagCompany;
    const files=req.file;
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    const categorys=await Category.findById(req.body.categoryId);
    if(!categorys)return res.status(404).send('this id not found');
   
    if(!files)
    {
        res.status(404).send('this file not found');
    }
    else 
    {
        imageJob=files.path;
    }
    // const user=await User.findById(req.body.userId);
    // if(!user)return res.status(404).send('this id not found');
   let category={ _id:categorys._id,name:categorys.name,description:categorys.description };
   let u={  _id:req.user._id,
            username:req.user.username,
            email:req.user.email,
            phone:req.user.phone,
            companyName:req.user.companyName,
            companyUrl:req.user.companyUrl,
             companyLogoUrl:req.user.companyLogoUrl,
            

            companyEmail:req.user.companyEmail};
    let jop=new Job();
     jop.jobImageUrl=imageJob;

   Object.assign(jop,req.body,{category:category},{user:u});
    await jop.save();
    res.send(jop);
}
//////////////////////////////////////////////////////////////////////////////////////////
module.exports.put=async(req,res)=>{

     const job=await Job.findById(req.params.id);
     console.log(typeof job.user._id);
     console.log(typeof req.user._id);

     if(job!=null && job.user._id.equals(req.user._id))
     {
         console.log('hi')
         if(req.body.categoryId){
            const categorys=await Category.findById(req.body.categoryId);
            if(!categorys)return res.status(404).send('this id not found');
            job.category=categorys;
         }
         if(req.body.name){job.name=req.body.name}
         if(req.body.content){job.content=req.body.content}
         if(req.body.numberOfWanted){job.numberOfWanted=req.body.numberOfWanted;}
         if(req.body.workAt){job.workAt=req.body.workAt;}
         if(req.body.position){job.position=req.body.position}
         if(req.body.position){job.position=req.body.position}
         if(req.body.positionSummary){job.position=req.body.positionSummary}
         if(req.body.division){job.position=req.body.division}
         if(req.body.companyInfo){job.position=req.body.companyInfo}
         if(req.body.experienceRequirements){job.position=req.body.experienceRequirements}
         if(req.body.requiredKnowledge){job.position=req.body.requiredKnowledge}
         if(req.body.workingConditions){job.position=req.body.workingConditions}
         if(req.body.note){job.position=req.body.note}
         await job.save()
         res.send(job);
     }
     else{
        res.status(404).send('this item not found');
     }
 }
 /////////////////////////////////////////////////////////////////////////////////
 module.exports.delete=async(req,res)=>{
    const job=await Job.findById(req.params.id);
    if(job!=null && job.user._id.equals(req.user._id) )
    {
        Job.findByIdAndRemove(job._id);
        res.send(job);
    }
    else{
        res.status(404).send('this item not foundgggg');
     }
}
////////////////////////////////////////////////////////////////////////

let params={
    query:{
        categoryId:"req.query.categoryId",
        categoryJop:"req.query.categoryJop",
        name:"req.query.name",
        userName:"req.query.userName",
        userEmail:"req.query.userEamil",
        userId:"req.query.userId",
    }
   
}


///////get all job for this CategoryId
    // if(req.query.categoryId){job=await Job.find({'category._id':req.query.categoryId});}



 
    // const jop=new Job({
    //     name:req.body.name,
    //     numberOfWanted:req.body.numberOfWanted,
    //     content:req.body.content,
    //     workAt:req.body.workAt,
    //     position:req.body.position,
    //     positionSummary:req.body.positionSummary,
    //     division:req.body.division,
    //     companyInfo:req.body.companyInfo,
    //     experienceRequirements:req.body.experienceRequirements,
    //     requiredKnowledge:req.body.requiredKnowledge,
    //     workingConditions:req.body.workingConditions,
    //     note:req.body.note,

    //     category:{ _id:categorys._id,name:categorys.name,description:categorys.description },

    //     user:{
    //         _id:user._id,
    //         name:user.name,
    //         email:user.email,
    //         phone:user.phone,
    //         companyName:user.companyName,
    //         companyUrl:user.companyUrl,
    //         companyLogoUrl:user.companyLogoUrl,
    //         companyEmail:user.companyEmail,}
    // });

    // module.exports.put=async(req,res)=>{
    //     // const {error}=validate(req.body)
    //     //  if(error)return res.status(400).send(error.details[0].message);
    //      const job=await Job.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name}},{new:true});
     
    //      if(!job)return res.status(404).send('this item not found');
    //      res.send(job); 
    //  }
    


    // module.exports.delete=async(req,res)=>{
    //     const {error}=validate(req.body);
    //     if(error)return res.status(400).send(error.details[0].message);
    //     const job=Job.findByIdAndRemove(req.params.id);
    //     res.send(job);
    // }