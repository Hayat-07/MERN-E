const createError= require('http-errors');
const { users } = require('../models/userModel');




const usersController=(req,res,next)=>{
    try{
        res.status(201).send({
            massagr:"Users found.",
           users
        });
    }catch (err){
        next(err);
    }
};


 const userProfileController=   (req,res)=>{
        res.status(201).send({
            massagr:"User profile found.",
           users:users[2]
        })
    }

    module.exports={usersController,userProfileController};