const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const {rolesSchema}=require('./memberShip/roles');
const userSchema=new mongoose.Schema({
    name:{type:String,minlength:3,maxlength:255,required:true},
    email:{type:String,minlength:3,maxlength:255,required:true,unique:true},
    phone:{type:String,minlength:5,maxlength:50,required:true},
    password:{type:String,minlength:3,maxlength:255,required:true},
    companyName:{type:String,minlength:3,maxlength:255},
    companyUrl:{type:String,minlength:3,maxlength:255},
    companyLogoUrl:{type:String,minlength:3,maxlength:255},
    companyEmail:{type:String,minlength:3,maxlength:255} ,
    isActive:{type:Boolean,default:false},
    dtCreated:{type:Date,default:Date.now,required:true},
    roles:[{type:rolesSchema}],
    isAdmin:{type:Boolean,default:function(){
      if(this.roles.find(e=>e.name==="admin"))
      return true;
      else{return false;}
    }},
});

const User=mongoose.model('user',userSchema);

function validation(user)
{
    const schema={
        name:Joi.string().min(3).max(255).required(),
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(3).max(255).required(),
        phone:Joi.string().min(5).max(50).required(),
        companyName:Joi.string().min(3).max(255),
        companyUrl:Joi.string().min(3).max(255),
        companyEmail:Joi.string().min(3).max(255).email(),
        companyLogoUrl:Joi.string().min(3).max(255),
        rolesId:Joi.array().items(Joi.objectId())
    }
    return Joi.validate(user,schema);
}
module.exports.userSchema=userSchema;
module.exports.User=User;
module.exports.validation=validation;
