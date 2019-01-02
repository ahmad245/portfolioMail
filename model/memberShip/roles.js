const Joi=require('joi');
const mongoose=require('mongoose');
Joi.objectId=require('joi-objectid')(Joi);


var permissionsSchema =new mongoose.Schema({
    name : String
});

const Permissions=mongoose.model('permissions',permissionsSchema);

module.exports.permissionsSchema=permissionsSchema;
 const rolesSchema =new mongoose.Schema({
        name : String,
        permissions : [ { type:permissionsSchema }]
    });

    const Roles=mongoose.model('roles',rolesSchema);

    function validate(roles)
        {
            const schema={
                name:Joi.string().min(3).max(250).required(),
                permissionsId:[Joi.objectId().required()]
            }
            return Joi.validate(roles,schema);
        }
    module.exports.Roles=Roles;
    module.exports.rolesSchema=rolesSchema;
    module.exports.Permissions=Permissions;
    module.exports.permissionsSchema=permissionsSchema;
    module.exports.validate=validate;