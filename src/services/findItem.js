const express =require('express');
const mongoose=require('mongoose');
const { User } = require('../models/userModel');
const { successResponse } = require('../controllers/responseController');

const findWithId=async(Model,id,options={},next)=>{
    
    try{

        
        const item= await Model.findById(id);
         if(!item){throw createError(404,`${Model.modelName} dosenot exist with this id`)}
           console.log(item);
           return item;
          

    }catch(error){
        if(error instanceof mongoose.Error){
            next(createError(400,'Invalid User Id'));
        }
         throw error;
    }


}



module.exports={findWithId};