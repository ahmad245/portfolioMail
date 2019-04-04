const {User,validation}=require('../model/users');
const {Roles}=require('../model/memberShip/roles');
const bcrypt=require('bcrypt');
const authenticate=require('../middleware/authenticate');
const passport=require('passport');

module.exports.get=async(req,res)=>{
    const user=await User.findById(req.body._id).select('-password');
    res.send(user);
}

module.exports.signup=async(req,res)=>{
    const result=  await Roles.find({_id:{$in:req.body.rolesId}}).select('-permissions');
 if(!result)return res.status(404).send("this is not found");    

 User.register(new User({
    username:req.body.username,
    email:req.body.email,
    phone:req.body.phone,
}),req.body.password,(err,user)=>{
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err,info:'ther are err here1'});
    }
    else {
        user.companyName=req.body.companyName;
        user.companyUrl=req.body.companyUrl;
        user.companyLogoUrl=req.body.companyLogoUrl;
        user.companyEmail=req.body.companyEmail;
        if(result.find(e=>e.name==="admin"))
        {
          user.isAdmin=true;
        }
        user.roles= result;
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err,info:'ther are err here2'});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      })
     
    }
  });
}

module.exports.login=async(req,res)=>{
    let token=authenticate.getToken({_id:req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true,infoId:req.user._id,username:req.user.username, token:token, status: 'You are successfully logged in!'});
  
}

module.exports.loginWithFacebook=async(req,res,next)=>{
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
}

module.exports.logout=async(req,res,next)=>{
    if(req.session)
    {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
    }
    else{
      var err=new Error('You Are Not Login');
      err.status=403;
      return next(err);
    }
  }
    
module.exports.put=async(req,res)=>{
    const result=  await Roles.find({_id:req.body.rolesId}).select('-permissions');
    if(!result)return res.status(404).send("this is not found");    

   const user=await User.findByIdAndUpdate(req.params.id,{$addToSet:{roles:result}},{new:true});
   
   if(!user)return res.status(404).send('this item not found');
   res.send(user);
}




// module.exports.post=async(req,res)=>{
//     const {error}=validation(req.body);
//     if(error)return res.status(400).send(error.details[0].message);
//     let user=await User.findOne({email:req.body.email});
//     if(user) return res.status(400).send('this user already exist');

//     const result=  await Roles.find({_id:{$in:req.body.rolesId}}).select('-permissions');
//  if(!result)return res.status(404).send("this is not found");    

//      user=new User({
//         name:req.body.name,
//         password:req.body.password,
        // email:req.body.email,
        // phone:req.body.phone,
        // companyName:req.body.companyName,
        // companyUrl:req.body.companyUrl,
        // companyLogoUrl:req.body.companyLogoUrl,
        // companyEmail:req.body.companyEmail,
        // roles: result
//     });

//     const salt=await bcrypt.genSalt(10);
//     user.password=await bcrypt.hash(user.password,salt);
//     await user.save();

//     res.send({name:user.name,email:user.email});
// }

// router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
//   if (req.user) {
//     var token = authenticate.getToken({_id: req.user._id});
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({success: true, token: token, status: 'You are successfully logged in!'});
//   }
// });