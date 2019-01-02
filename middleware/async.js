module.exports=function(callback){
    return async(req,res,next)=>{
        try {
        
            await  callback(req,res,next)
      
          } catch (error) {
              next();
          }
    }
   
}