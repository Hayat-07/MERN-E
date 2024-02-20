const createError= require('http-errors');
const { users, User } = require('../models/userModel');




const usersController= async(req,res,next)=>{
    try{
        const search= req.query.search || "";
        const page= Number(req.query.page) || 1;
        const limit= Number(req.query.limit) || 1;
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
        
        
        
        res.status(201).send({
            users:users,
            massagr:"Users found.",
            pagination:{
                totalPage:Math.ceil(count/limit),
                currentPage:page,
                previousPage:page-1>0?page-1:null,
                nextPage:page+1<=Math.ceil(count/limit)?page+1:null,

            },
            

           
        });
    }catch (err){
        next(err);
    }
};


 const userProfileController=  async (req,res)=>{
        res.status(201).send({
            massagr:"User profile found.",
           users:users[2]
        })
    }

    module.exports={usersController,userProfileController};