const {Permissions}=require('../../model/memberShip/roles');
module.exports.get=async (req,res,next)=>{
   const permission=await Permissions.find().sort({name:1});
   res.send(permission);
}
module.exports.getById=async (req,res,next)=>{
    const permission=await Permissions.findById(req.params.id);
    if(!permission)return res.status(404).send('this is not found');
    res.send(permission);
}
module.exports.post=async (req,res,next)=>{
    const permission=new Permissions({
        name:req.body.name
    });
    await permission.save();
    res.send(permission);
}
module.exports.put=async (req,res,next)=>{
    const permission=await Permissions.findByIdAndUpdate(req.params.id,
        {
            $set:{
                name:req.body.name
            }
        },{new:true});

        if(!permission)return res.status(400).send("this item not found");
       
        res.send(permission);
}
 module.exports.delete=async(req,res,next)=>{
    const permission=await Permissions.findByIdAndRemove(req.params.id);
   res.send(permission);
}