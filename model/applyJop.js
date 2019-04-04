const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const applyJobschema=new mongoose.Schema({
    user:{type :new mongoose.Schema({
        // username:{type:String,required:true,minlength:3,maxlength:255},
        // email:{type:String,required:true,minlength:3,maxlength:255,unique:true},
        // phone:{type:String,minlength:5,maxlength:50,required:true}}, {strict: true}) },

        username:{type:String},
        email:{type:String},
        phone:{type:String },
    })},
    job:{type:new mongoose.Schema({
        name:{type:String,maxlength:255,minLength:5,required:true},
        userWriterId:{type:mongoose.Types.ObjectId},
        userWriterName:{type:String},
        userWriterEmail:{type:String}
    },{strict: true})},
    applyDate:{type:Date,default:Date.now,required:true},
    gender:{type:String,enum:['Male','Female'],required:true},
    birthday:{
        day:{type:Number,required:true},
        month:{type:Number,required:true},
        year:{type:Number,required:true},
    },
    nationality:{type:String,required:true,minlength:3,maxlength:255},
    stateSociety:{type:String,required:true,minlength:3,maxlength:255},
    experiance:{
       isExperiance:{type:Boolean,default:false} ,
       yearOfEXperiance:{type:Number},
       monthOfExperiance:{type:Number},},
    company:{
        companyName:{type:String,required:true,minlength:3,maxlength:255},
        companyDepartment:{type:String,minlength:3,maxlength:255}, },
    education:{
        isEducation:{type:Boolean,default:false},
        educationName:{type:String,minlength:3,maxlength:255},
        imageOfEducationDegree:{type:String,minlength:3,maxlength:255},
        educationspecialization:{type:String,minlength:3,maxlength:255},},
    dateOfgraduatin:{
        dateOfgraduatingMonth:{type:Number},
        dateOfgraduatingYear:{type:Number},
        countryOfgraduating:{type:String,minlength:3,maxlength:255},
        graduationRate:{type:Number},},
    skiling:{ 
        type:Array,
        validate:{
        isAsync:true,
        validator:function(v,callback){
            const result= v && v.length>0;
            callback(result);
           },
            message:"skiling shoud have at least one value"
           }},
    languge:{ 
        type:Array,
        validate:{
        isAsync:true,
        validator:function(v,callback){
            const result= v && v.length>0;
            callback(result);
           },
            message:"languge shoud have at least one value"
           }},

});
applyJobschema.index({"education.educationName":'text'});
applyJobschema.index({"job.name":1});
applyJobschema.index({"user.username":1});
const ApplyJob=mongoose.model('applyJob',applyJobschema);
function validate(applyJob)
{
    const schema={
             // userId:Joi.objectId().required(),
              jobId:Joi.objectId().required(),
              gender:Joi.string().required(),
              birthday:{
                  day:Joi.number().required(),
                  month:Joi.number().required(),
                  year:Joi.number().required(),
              },
              nationality:Joi.string().min(3).max(255).required(),
              stateSociety:Joi.string().min(3).max(255).required(),
              experiance:{
                isExperiance:Joi.boolean().required(),
                yearOfEXperiance:Joi.number().required(),
                monthOfExperiance:Joi.number().required()
                },
             company:{
                 companyName:Joi.string().min(3).max(255).required(),
                 companyDepartment:Joi.string().min(3).max(255).required()
                },
             education:{
                 educationName:Joi.string().min(3).max(255).required(),
                 imageOfEducationDegree:Joi.string().min(3).max(255).required(),
                 educationspecialization:Joi.string().min(3).max(255).required()
                },
             dateOfgraduatin:{
                 dateOfgraduatingMonth:Joi.number().required(),
                 dateOfgraduatingYear:Joi.number().required(),
                 countryOfgraduating:Joi.string().min(3).max(255).required(),
                 graduationRate:Joi.number().required()
                },
             skiling:Joi.array().required(),
             languge:Joi.array().required()


    }
    return Joi.validate(applyJob,schema);
}

module.exports.ApplyJob=ApplyJob;
module.exports.validate=validate;
 





// Gender:{type:String,possibleValues:['Male','Female']},
    // day:{type:Number,required:true},
    // month:{type:Number,required:true},
    // year:{type:Number,required:true},
    // Nationality:{type:String,required:true,minlength:3,maxlength:255},
    // StateSociety:{type:String,required:true,minlength:3,maxlength:255},
    // Experiance:{type:Boolean},
    // YearOfEXperiance:{type:Number},
    // MonthOfExperiance:{type:Number},
    // CompanyName:{type:String,required:true,minlength:3,maxlength:255},
    // CompanyDepartment:{type:String,minlength:3,maxlength:255},
    // EducationName:{type:String,minlength:3,maxlength:255},
    // ImageOfEducationDegree:{type:String,minlength:3,maxlength:255},
    // Educationspecialization:{type:String,minlength:3,maxlength:255},
    // DateOfgraduatingMonth:{type:Number},
    // DateOfgraduatingYear:{type:Number},
    // CountryOfgraduating:{type:String,minlength:3,maxlength:255},
    // GraduationRate:{type:Number},
    // Skiling:{type:String,minlength:3,maxlength:1500},
    // Languge:{type:String,minlength:3,maxlength:255},