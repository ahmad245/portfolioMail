// {
//     "name":"javaScript-Develover",
//     "content":"this job for develober back-end",
//     "categoryId":"5c20f98ac175b71b4c349bde",
//     "userId":"5c20f911c175b71b4c349bdd",
//     "numberOfWanted":200,
//     "workAt":"in company",
//     "position":"master",
//     "positionSummary":"for drive group",
//     "division":"developer",
//     "companyInfo":"this company is great and hisory 1986",
//     "experienceRequirements":["http","https","js","node"],
//     "requiredKnowledge":["http","https","js","node"],
//     "workingConditions":["http","https","js","node"],
//     "note":"there are ....."

// }
///////////////////////////////////applayJop
// {
//     "userId":"5c20f911c175b71b4c349bdd",
//    "jobId":"5c20fd7fdea83715d4ade193",
//    "gender":"Male",
//    "birthday":{
//        "day":31,
//        "month":3,
//        "year":1986
//    },
//    "nationality":"syria",
//    "stateSociety":"marid",
//    "experiance":{
//      "isExperiance":true,
//      "yearOfEXperiance":1,
//      "monthOfExperiance":1
//      },
//   "company":{
//       "companyName":"facebook",
//       "companyDepartment":"admin"
//      },
//   "education":{
//       "educationName":"ingener",
//       "imageOfEducationDegree":"www.g.com",
//       "educationspecialization":"developer"
//      },
//   "dateOfgraduatin":{
//       "dateOfgraduatingMonth":1,
//       "dateOfgraduatingYear":2012,
//       "countryOfgraduating":"syria",
//       "graduationRate":61
//      },
//   "skiling":["java","mongodb"],
//   "languge":["arab","english","france"]

// }
/////////////////////////////////////////////////////////
// var permissions_schema = mongoose.Schema({
//     name : String,
//     title : String
// }); // this are mostly static data

// var roles_schema = mongoose.Schema({
//     name : String,
//     title : String,
//     _permissions : Array
// });// _permissions is an array that contain permissions _id

// var contacts_schema = mongoose.Schema({
//     mobile : String,
//     password : String,
//     first_name : String,
//     last_name : String,
//     _role : Number,
//     _enabled : Boolean,
//     _deleted : Boolean,
//     _verify_code : Number,
//     _groups_id : Array,
//     _service_id : String
// }); // and at last _role is _id of the role which this user owns.
// With something like these collections you can manage your users easily. I hope these have good ideas for you.

// UPDATE : A more flexible schema can have array of role_id in contact object, and contact can have many role and his /her permissions are merge of all roles permissions.

// ou can do this with a small change to what you have there. I store messages in an app the same way (text and sender).

// Here's what you could do:

// members: [{
//     role: { 
//       type: String
//     },
//     user: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'User'
//     }
//   }],
// Then when you want to add a member or members to an organization (assume you have already created an organization and a user separately):

// function addNewMember(org_id, user_id, role) {   
//     var member = {role: role, user: user_id};
//     Organization.findByIdAndUpdate(org_id, {"$push": {"members":member}}, function(err,org) {
//                ...
//              });)  
// you can use the $each clause to add a whole array of members at the same time too
// like so:
// {"$push": {"members": 
//              {
//              "$each": [memberarray]
//              }}}

// }
// And when you want to find an organization including it's members, you could do:

//     Organization.findById(org_id) 
//         .populate('members.user')
//         .exec(callbackfunction);
// Think carefully if you do absolutely need to duplicate the Organization -> member relationship for each member too as Member -> organizations. If this is indeed important, after successfully adding the user to the organization, in the callback you can do a second query to update the user's orgs field just like above.

///////////////////////////////////////////////////////////////////////////

// var UserSchema = new Schema({
//     firstName: {
//         type: String,
//         trim: true,
//         default: '',
//         validate: [validateLocalStrategyProperty, 'Please fill in your first name']
//     },
//     lastName: {
//         type: String,
//         trim: true,
//         default: '',
//         validate: [validateLocalStrategyProperty, 'Please fill in your last name']
//     },
//     displayName: {
//         type: String,
//         trim: true
//     },
//     email: {
//         type: String,
//         trim: true,
//         default: '',
//         validate: [validateLocalStrategyProperty, 'Please fill in your email'],
//         match: [/.+\@.+\..+/, 'Please fill a valid email address']
//     },
//     username: {
//         type: String,
//         unique: 'testing error message',
//         required: 'Please fill in a username',
//         trim: true
//     },
//     password: {
//         type: String,
//         default: '',
//         validate: [validateLocalStrategyPassword, 'Password should be longer']
//     },
//     salt: {
//         type: String
//     },
//     provider: {
//         type: String,
//         required: 'Provider is required'
//     },
//     providerData: {},
//     additionalProvidersData: {},
//     roles: {
//         type: [{
//             type: String,
//             enum: ['user', 'admin']
//         }],
//         default: ['user']
//     },
//     updated: {
//         type: Date
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     },
//     /* For reset password */
//     resetPasswordToken: {
//         type: String
//     },
//     resetPasswordExpires: {
//         type: Date
//     }
// });