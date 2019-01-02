

// //for create collectn
// db.createCollection('posts',
// {
//     validator:{
//         $jsonSchema:{
//             bsonType:'object',
//             required:['text','title','creator','comments'],
//             properties:{
//                 text:{
//                     bsonType:'string',
//                     description:'must be un string and required'
//                 },
//                 title:{
//                     bsonType:'string',
//                     description:'must be un string and required'
//                 },
//                 creator:{
//                     bsonType:'objectId',
//                     description:"must be object id and required"
//                 },
//                 comments:
//                 {
//                     bsonType:'array',
//                 description:'must be array of object',
//                 items:{
//                     bsonType:'object',
//                     required:['autor','text'],
//                     properties:{
//                         autor:{
//                             bsonType:'objectId',
//                             description:"must be un object"
//                         },
//                         text:{
//                             bsonType:"string",
//                             description:"must be un string and required"
//                         }
//                     }
//                 }
//                 }
//             }
//         }
//     }
// })

// //////for 
// db.runCommand({'collMod':'posts', 
//  validator:{
//     $jsonSchema:{
//         bsonType:'object',
//         required:['text','title','creator','comments'],
//         properties:{
//             text:{
//                 bsonType:'string',
//                 description:'must be un string and required'
//             },
//             title:{
//                 bsonType:'string',
//                 description:'must be un string and required'
//             },
//             creator:{
//                 bsonType:'objectId',
//                 description:"must be object id and required"
//             },
//             comments:
//             {
//                 bsonType:'array',
//             description:'must be array of object',
//             items:{
//                 bsonType:'object',
//                 required:['autor','text'],
//                 properties:{
//                     autor:{
//                         bsonType:'objectId',
//                         description:"must be un object"
//                     },
//                     text:{
//                         bsonType:"string",
//                         description:"must be un string and required"
//                     }
//                 }
//             }
//             }
//         }
//     }
// },
// //validationAction:'error'
// validationAction:'warn'
// })

// db.person.aggregate([
//    {$project:{
//     _id:0,email:1,  name:1,
//     location:{
//         type:"point",
//         coordinates:[ 
//             { $toDouble:"$location.coordinates.longitude"},
//             {$toDouble:"$location.coordinates.latitude"}
//                    ]
//              },
//        date:{ $toDate:"$dob.date"},
//       age:"$dob.age"        
//    }},
//     {  $project:{
//         email:1,
//         location:1,
//         date:1,
//         age:1,
//         gender:1,
//         name:1,
//         fullName:{
//             $concat:[
//                 {$toUpper:{$substrCP:["$name.first",0,1]}},
//                 {$substrCP:["$name.first",1,{$subtract:[{$strLenCP:"$name.first"},1]}]}
                
//                 ," ",
//                 {$toUpper:{$substrCP:["$name.last",0,1]}},
//                 {$substrCP:["$name.last",1,{$subtract:[{$strLenCP:"$name.last"},1]}]}
//                   ]
//                 }
//             }
//     },
//     {$group:{_id:{birthYear:{$isoWeekYear:"$date"}},personPerYear:{$sum:1}}},
//     {$sort:{personPerYear:-1}}
// ]).pretty()

/////////////////////////////////////////
// db.friend.aggregate([
//     {$group:{_id:{age:"$age"},arrHobbies:{$push:"$hobbies"}}}
// ]).pretty()
// //////////////////
// db.friend.aggregate([
//     {$unwind:"$hobbies"}
// ]).pretty()
// /////////////
// db.friend.aggregate([
//     {$unwind:"$hobbies"},
//     {$group:{_id:{age:"$age"},allHobbies:{$push:"$hobbies"}}}
// ]).pretty()
// ////////////////////////////////
// db.friend.aggregate([
//     {$unwind:"$hobbies"},
//     {$group:{_id:{age:"$age"},allHobbies:{$addToSet:"$hobbies"}}}
// ]).pretty()
// /////////////////////////////
// db.friend.aggregate([
//     {$project:{_id:0,examScores:{$slice:["$examScores",2,1]}}}
// ]).pretty()
// //////////////////////////////
// db.friend.aggregate([
//     {$project:{_id:0,examScores:{$size:"$examScores"}}}
// ]).pretty()
// ////////////////////////////////
// db.friend.aggregate([
//     {$project:{_id:0,
//         examScores:{ $filter: {input:"$examScores" ,as:"el" ,cond:{$gt:["$$el.score",60]}}  }
//     }}
// ]).pretty()
// db.friend.aggregate([
//     {$project:{_id:0,name:1,
//         examScores:{ $gt:["$examScores.score",60]} 
//     }}
// ]).pretty()
// ////////////
// db.friend.aggregate([
//     {$project:{_id:0,name:1, score:{$max:"$examScores.score"}}},
//     {$sort:{score:-1}}

// ]).pretty()
// db.friend.aggregate([
//     {$project:{_id:0,name:1, score:{$avg:"$examScores.score"}}},
//     {$sort:{score:-1}}
// ]).pretty()
// db.friend.aggregate([
//     {$project:{_id:0,name:1, score:"$examScores.score"}},
//     {$sort:{score:-1}}
// ]).pretty()
// /////
// db.friend.aggregate([
//     {$unwind:"$examScores"},
//     {$project:{_id:1,name:1,scoregg:"$examScores.score"}},
//     {$sort:{scoregg:-1}},
//     {$group:{_id:"$_id",name:{$last:"$name"}, score:{$avg:"$scoregg"}}},
//     {$sort:{score:-1}}
// ]).pretty()

// ////////
// db.friend.aggregate([
//     {$bucket:{groupBy:"$age",boundaries:[0,29,30,70],output:{names:{$push:"$name"}}}}
// ]).pretty()
//////////////////

// db.friend.aggregate([
//     {$group:{_id:{age:"$age"},score:{$push:"$age"}}},
    
//     {$sort:{score:-1}}
// ]).pretty()
// db.friend.aggregate([
//     {$bucket:{groupBy:"$age",boundaries:5,output:{name:{$push:$name}}}}
// ]).pretty()
// ///////////////////////////////////////10 user with oldest birth
// db.person.aggregate([
//     {$project:{_id:0,name:{$concat:["$name.first"," ","$name.last"]},birth:{$toDate:"$dob.date"}}},
//     {$sort:{birth:1}},
//     {$skip:10},
//     {$limit:10}
// ])