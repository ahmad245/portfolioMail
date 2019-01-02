const {Category,validate}=require('../model/category');
module.exports.get=async(req,res)=>{
    const category=Category.find().sort('name');
    res.send(category);
}
module.exports.getById=async(req,res)=>{
    const category=Category.findById(req.params.id);
    if(!category)return res.status(404).send('this category not found');
    res.send(category);
}

module.exports.post=async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // const category=new Category({
    //     name:req.body.name,
    //     description:req.body.description
    // });
    const category=new Category();
    Object.assign(category,req.body);
   
    await category.save();
    res.send(category);
}

module.exports.put=async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    const category=await Category.findByIdAndUpdate(req.params.id,
        {
            $set:{
                name:req.body.name
            }
        },{new:true});
        if(!category)return res.status(400).send("this item not found");
       
        res.send(category);
}
 module.exports.delete=async(req,res)=>{
    const category=await Category.findByIdAndRemove(req.params.id);
   res.send(category);
}