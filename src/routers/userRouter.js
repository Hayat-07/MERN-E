
const express=require("express");

const { userProfileController, usersController } = require("../controllers/userControllers");
const userRouter= express.Router();

const isLoggedIn=(req,res,next)=>{
    let login=true;
    if(login){
        next()
    }else{
        res.status(404).send({
            massageFromMiddleWere:"Please loggedIn!!!!!!!!"
        })
    }
    
};













userRouter.get("/",isLoggedIn,usersController)
userRouter.get("/profile",isLoggedIn,userProfileController)

module.exports={userRouter}