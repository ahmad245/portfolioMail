const config=require('config');

module.exports=function()
{
     if(!config.get('secretKey'))
    {
        // console.error('fild the token not define');
        // process.exit(1);

        throw new Error('fild the token not define');
      
    }
}

