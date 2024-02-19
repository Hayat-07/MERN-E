const mongoose=require('mongoose');
const { mongoDBUrl } = require('../secret');

const connectDB=(options={})=>{
    try{
         mongoose.connect(mongoDBUrl,options)
         .then(console.log('MongoDb is connected sucessfully'))
         .catch(err=>console.error(err));
       
        

    }catch(err){
       
            console.error('Could not connect to db:',err);
        
    }
}

module.exports= {connectDB};