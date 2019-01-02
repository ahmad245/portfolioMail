const {Roles,Permissions}=require('../../model/memberShip/roles');

module.exports.get=async(req,res,nex)=>{
    const role=Roles.find().sort({name:1});
    res.send(role);
}
module.exports.getById=async (req,res,next)=>{
    const role=await Roles.findById(req.params.id);
    if(!role)return res.status(404).send('this is not found');
    res.send(role);
}
module.exports.post=async (req,res,next)=>{
    
 const result=  await Permissions.find({_id:{$in:req.body.permissionsId}});
 if(!result)return res.status(404).send("this is not found");     
    const role=new Roles({
        name:req.body.name,
        permissions:result
    });
    await role.save();
    res.send(role);
}
module.exports.put=async (req,res,next)=>{
    const role=await Roles.findByIdAndUpdate(req.params.id,
        {
            $set:{
                name:req.body.name
            }
        },{new:true});

        if(!role)return res.status(400).send("this item not found");
       
        res.send(role);
}
 module.exports.delete=async(req,res,next)=>{
    const role=await Roles.findByIdAndRemove(req.params.id);
   res.send(role);
}
