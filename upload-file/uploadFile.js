const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

//var uploadMultiFile = upload.fields([{ name: 'jobImageUrl', maxCount: 1 }, { name: 'companyLogoUrl', maxCount: 1 }])

module.exports=upload;




// module.exports=uploadMultiFile;
// module.exports = function (name) {
//     try {
//         // Configuring appropriate storage 
//         var storage = multer.diskStorage({
//             // Absolute path
//             destination: function (req, file, callback) {
//                 callback(null, './uploads/'+name);
//             },
//             // Match the field name in the request body
//             filename: function (req, file, callback) {
//                 callback(null, file.fieldname + '-' + Date.now());
//             }
//         });
//         return storage;
//     } catch (ex) {
//         console.log("Error :\n"+ex);
//     }
// }