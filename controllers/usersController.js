const {User,validation}=require('../model/users');
const {Roles}=require('../model/memberShip/roles');
const bcrypt=require('bcrypt');
module.exports.get=async(req,res)=>{
    const user=await User.findById(req.body._id).select('-password');
    res.send(user);
}

module.exports.post=async(req,res)=>{
    const {error}=validation(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('this user already exist');

    const result=  await Roles.find({_id:{$in:req.body.rolesId}}).select('-permissions');
 if(!result)return res.status(404).send("this is not found");    

     user=new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        companyName:req.body.companyName,
        companyUrl:req.body.companyUrl,
        companyLogoUrl:req.body.companyLogoUrl,
        companyEmail:req.body.companyEmail,
        roles: result
    });

    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();

    res.send({name:user.name,email:user.email});

}
