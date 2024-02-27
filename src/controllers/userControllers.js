const express= require('express');
const createError= require('http-errors');
const { users, User } = require('../models/userModel');
const { successResponse, errorResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findWithId } = require('../services/findItem');
const { deleteWithId } = require('../services/deleteItem');
const { createJwt } = require('../helpers/jwt');
const { jwtActivationKey } = require('../secret');

const { sendMyMail } = require('../helpers/sendMail');




let userData={};

const createAccount=async(req,res,next)=>{

   try{
    //  const {name,email,password,phone,address}=userData;
    // const createNewItem=(await User.create({name,email,password,phone,address})).toObject();
    // if(createNewItem){
    //     const token=createJwt(userData,jwtActivationKey,'10m');
    //     console.log(createNewItem);
    //     return successResponse(res,{
    //         statusCode:200,
    //         message:"Congratulation Your account is created Successfully",
    //         payload:{
    //             userData,
    //             createNewItem,
    //             token
    //         }

    //     })
    // }
    
  
   }catch(err){
    console.error(" Account is not created. Please check createAccount() from userControllers");
    throw err;
   }
};

const processRegister=async(req,res,next)=>{
      
    try{
        const {name,email,password,phone,address}=req.body;
        const isUserExists=await User.exists({email:email,phone:phone});
        userData={name,email,password,phone,address};
        console.log(userData);
        if(isUserExists){
           throw createError(409,"User with this email and phone, already exists. Please Sign in. ")
        }else{
        

          await sendMyMail(req,res,{ 
                
                to:email,
                subject:"Account activation email",
                text:" Please go to your email and varify to create your account.",
                myhtml:`<h2>Helo ${name}</h2>
                        <p>Please click here to this link: <a href="${process.env.CLIENT_URL}/api/users/createAccount/${token}"   target="_blank" >Activate</a> to Varyfy your account </p>
                `
            }
            );
            
           
        }

       


        

    }catch(error){
       next(error);
    }



      
};









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











 

    module.exports={createAccount,usersController,getUserController,deleteUserController,processRegister};