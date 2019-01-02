const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const {categorySchema}=require('./category');
const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    name:{type:String,maxlength:255,minLength:5,required:true},
    content:{type:String,maxlength:255,minLength:5,required:true},
    category:{type:categorySchema},
    user:{type:new mongoose.Schema({
        name:{type:String,minlength:3,maxlength:255,required:true},
        email:{type:String,minlength:3,maxlength:255,required:true},
        phone:{type:String,minlength:5,maxlength:50,required:true},    
        companyName:{type:String,minlength:3,maxlength:255},
        companyUrl:{type:String,minlength:3,maxlength:255},
        companyLogoUrl:{type:String,minlength:3,maxlength:255},
        companyEmail:{type:String,minlength:3,maxlength:255} ,
    },{strict: true})},
    numberOfWanted:{type:Number,required:true},
    workAt:{type:String,maxlength:255,minLength:3,required:true},
    position:{type:String,maxlength:255,minLength:3,required:true},
    positionSummary:{type:String,maxlength:1500,minLength:3,required:true},
    division:{type:String,maxlength:255,minLength:3,required:true},
    companyInfo:{type:String,maxlength:1500,minLength:3,required:true},
    experienceRequirements:{
        type:Array,
        validate:{
        isAsync:true,
        validator:function(v,callback){
            const result= v && v.length>0;
            callback(result);
           },
            message:"requiredKnowledge shoud have at least one value"
           }
        },
    requiredKnowledge:{
        type:Array,
         validate:{
             isAsync:true,
             validator:function(v,callback){
                 const result= v && v.length>0;
                 callback(result);              },
                 message:"requiredKnowledge shoud have at least one value"
                } },
    workingConditions:{
        type:Array,
        validate:{
        isAsync:true,
        validator:function(v,callback){
            const result= v && v.length>0;
            callback(result);
        },
            message:"workingConditions shoud have at least one value"}},
    note:{type:String,maxlength:1500,minLength:3},
});
jobSchema.index({name:"text",content:"text"});

const Job=mongoose.model('job',jobSchema);

function validate(job)
{
    const schema={
        name:Joi.string().min(5).max(255).required(),
        content:Joi.string().min(5).max(255).required(),
        categoryId:Joi.objectId().required(),
        userId:Joi.objectId().required(),
        numberOfWanted:Joi.number().required(),
        workAt:Joi.string().min(3).max(255).required(),
        position:Joi.string().min(3).max(255).required(),
        positionSummary:Joi.string().min(3).max(1500).required(),
        division:Joi.string().min(3).max(255).required(),
        companyInfo:Joi.string().min(3).max(255).required(),
        experienceRequirements:Joi.array().required(),
        requiredKnowledge:Joi.array().required(),
        workingConditions:Joi.array().required(),
        note:Joi.string().min(3).max(1500).required()
    };
    return Joi.validate(job,schema);

}
module.exports.Job=Job;
module.exports.validate=validate;