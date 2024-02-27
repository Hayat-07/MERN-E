
const express=require("express");

const { userProfileController, usersController, getUserController, deleteUserController, processRegister, createAccount } = require("../controllers/userControllers");
const userRouter= express.Router();

const isLoggedIn=(req,res,next)=>{
    let login=true;
    if(login){
        next();
    }else{
        res.status(404).send({
            massageFromMiddleWere:"Please loggedIn!!!!!!!!"
        })
    }
    
};




userRouter.post("/register",isLoggedIn,processRegister);
userRouter.post("/createAccount/:token",isLoggedIn,createAccount);
userRouter.get("/",isLoggedIn,usersController);
userRouter.get("/:id",isLoggedIn,usersController);
userRouter.delete("/:id",isLoggedIn,deleteUserController);


module.exports={userRouter}