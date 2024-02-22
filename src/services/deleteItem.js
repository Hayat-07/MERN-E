const mongoose=require('mongoose');
const { User } = require('../models/userModel');

const deleteWithId=async(Model,id,options={},next)=>{
    
    try{

        
        const item= await Model.findById(id);
        
         if(!item){
            throw createError(404,`${Model.modelName} dosenot exist with this id`)
        }else{
            const deleteItemResult= await User.deleteOne({_id:id,isAdmin:false})
            console.log(deleteItemResult);
        }
           return deleteItemResult;
        

    }catch(error){

        if(error instanceof mongoose.Error){
            next(createError(400,'Invalid Item Id'));
        }
    }


}



module.exports={deleteWithId};