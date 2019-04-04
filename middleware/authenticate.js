
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const {User}=require('../model/users')
//const config=require('./config');

const config=require('config');
const jwt=require('jsonwebtoken');
const JwtStrategy=require('passport-jwt').Strategy;
const JwtExtract=require('passport-jwt').ExtractJwt;

const FacebookTokenStrategy = require('passport-facebook-token');
const configFacebook=require('../startup/configFacebook');


exports.local=passport.use(new LocalStrategy(User.authenticate()));
//exports.local=passport.use(new LocalStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken=function(user){
    return jwt.sign(user,config.get('secretKey'),{expiresIn:36000});
}

let opts={}
opts.jwtFromRequest=JwtExtract.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.get('secretKey');
//opts.secretOrKey="12345-67891-23456-78912"

exports.jwtPassport=passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
        console.log('Jwt Payload',jwt_payload);
        User.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){
                return done(err,false);
            }
            else if(user){return done(null,user);}
            else{return done(null,false);}
        })
       }
    )
);

exports.verifyUser=passport.authenticate('jwt',{session:false});
exports.veryFyAdmin=(req,res,next)=>
{
    
    if(!req.user.isAdmin) return res.status(403).send('access denied');
    next();
}

exports.verifyUserWriter=(req,res,next)=>{
    if(!req.user.roles.find(e=>e.name==="respons"))return res.status(403).send('access denied');
    next();
    
}

exports.verfiyWriterOrAdmin=(req,res,next)=>{
    if(req.user.isAdmin || req.user.roles.find(e=>e.name==="respons"))
    {
        next();
    }
    else{
        return res.status(403).send('access denied');
    }
}

//////Facebook
exports.facebookPassport = passport.use(new FacebookTokenStrategy({
   
    clientID: configFacebook.facebook.clientId,
    clientSecret: configFacebook.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            // user.firstname = profile.name.givenName;
            // user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));










// function requireAdmin() {
//     return function(req, res, next) {
//       User.findOne({ req.body.username }, function(err, user) {
//         if (err) { return next(err); }
  
//         if (!user) { 
//           // Do something - the user does not exist
//         }
  
//         if (!user.admin) { 
//           // Do something - the user exists but is no admin user
//         }
  
//         // Hand over control to passport
//         next();
//       });
//     }
//   }