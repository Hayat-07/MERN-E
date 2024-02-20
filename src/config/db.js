const mongoose=require('mongoose');
const { mongoDBUrl } = require('../secret');

const connectDB=(options={})=>{
    try{
        //  mongoose.connect(mongoDBUrl,options)
        mongoose.connect('mongodb+srv://hayat:hayat@cluster-estate.hkxwcar.mongodb.net/MERN-E')
       
        .then(x=>{
            // console.log(x);
            return x;
        })
        .catch(err=>console.error(err));
       
        

    }catch(err){
       
            console.error('Could not connect to db:',err);
        
    }
}

module.exports= {connectDB};