const mongoose=require('mongoose');
const Joi=require('joi');
const contactSchema=new mongoose.Schema({
    name:{type:String,maxLength:255,minLength:5,required:true,index:true},
    email:{type:String,minlength:3,maxlength:255,required:true},
    message:{type:String,minlength:3,maxlength:1024}
});

const Contact=mongoose.model('contact',contactSchema);

function validate(contact)
{
    const schema={
        name:Joi.string().min(5).max(2500).required(),
        email:Joi.string().min(3).max(255).required().email(),
        message:Joi.string().min(3).max(1024).required()
    }
    return Joi.validate(contact,schema);
}

module.exports.Contact=Contact;
module.exports.contactSchema=contactSchema;
module.exports.validate=validate;
