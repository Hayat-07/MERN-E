const express= require('express');
const createError= require('http-errors');
const { users, User } = require('../models/userModel');
const { successResponse, errorResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findWithId } = require('../services/findItem');
const { deleteWithId } = require('../services/deleteItem');




const usersController= async(req,res,next)=>{
    try{
        const search= req.query.search || "";
        const page= Number(req.query.page) || 1;
        const limit= Number(req.query.limit) || 5;
        const searchRegExp= new RegExp('.*'+search+'.*','i');
        const filter= {
            isAdmin:{$ne:true},
            $or:[
                {name:{$regex: searchRegExp }},
                {email:{$regex: searchRegExp }},
                {phone:{$regex: searchRegExp }}
            ]
        }
        const doNotExport= {password:0}
        const skip= (page-1)*limit;


        let users=await User.find(filter,doNotExport).limit(limit).skip(skip);
        let count =await User.find(filter).countDocuments();
        
        if(!users) throw createError(404,"No User found")
        
         return successResponse(res,{
            statusCode:201,
            message:"Users Found",
            payload:{
                users:users,
                pagination:{
                    totalPage:Math.ceil(count/limit),
                    currentPage:page,
                    previousPage:page-1>0?page-1:null,
                    nextPage:page+1<=Math.ceil(count/limit)?page+1:null,
    
                },
            }
         })


    }catch (err){
        next(err);
    }
};




















const getUserController= async(req,res,next)=>{
    try{
        console.log(req.params.id);
        let id= req.params.id;
        let options={password:0};
       
        let profile= await findWithId(User,id,options);
        if(profile){
            return successResponse(res,{
                statusCode:201,
                message:"User profile Found",
                payload:{
                    profile,
                }
             })
        }
       


    }catch (error){
        console.log(error);
        if(error instanceof mongoose.Error){
            next(createError(400,'Invalid User Id'));
        }
        next(error);
    }
};




const deleteUserController= async(req,res,next)=>{
    try{
        console.log(req.params.id);
        let id= req.params.id;
        console.log(typeof id, id);
        let deleteItem=await deleteWithId(User,id,)
       
        return successResponse(res,{
            statusCode:201,
            message:`User ${id} Deleted Successfully`,
            payload:{
                deleteItem,
            }
         })
        
    }catch (error){
        if(error instanceof mongoose.Error){
            next(createError(400,'Invalid User Id'));
        }
        next(error);
    }
};










 

    module.exports={usersController,getUserController,deleteUserController};