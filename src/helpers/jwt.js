const jwt=require('jsonwebtoken');


const createJwt=(payload,sckey,expiresIn)=>{
  try{
    if(typeof payload !== 'object' ||!payload){
        throw new Error('Payload must be a non empty object');
     }else if(typeof sckey!== 'string' || !sckey){
        throw new Error('Secreat key must be a non empty string');
     }else{

        const token= jwt.sign(payload,sckey,{expiresIn});
        console.log('Token is created:',token);
        return token;
     }
  }catch(err){
    console.error('Failed to sign in JWT',err);
    throw err;
  }
    
};





module.exports={createJwt};