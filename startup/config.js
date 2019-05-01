const config=require('config');

module.exports=function()
{
     if(!config.get('secretKey') && config.get('email') && config.get(pass))
    {
        // console.error('fild the token not define');
        // process.exit(1);

        throw new Error('fild the token not define');
      
    }
}

