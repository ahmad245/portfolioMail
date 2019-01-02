const mongoose=require('mongoose');
const Joi=require('joi');
const categorySchema=new mongoose.Schema({
    name:{type:String,maxLength:255,minLength:5,required:true,index:true},
    description:{type:String,maxLength:255,minLength:5,required:true}
});

const Category=mongoose.model('category',categorySchema);

function validate(category)
{
    const schema={
        name:Joi.string().min(5).max(2500).required(),
        description:Joi.string().min(5).max(2500).required()
    }
    return Joi.validate(category,schema);
}

module.exports.Category=Category;
module.exports.categorySchema=categorySchema;
module.exports.validate=validate;
