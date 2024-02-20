const { usersData } = require("../data");
const { User } = require("../models/userModel");

const seedController=async(req,res,next)=>{


    try{

        await User.deleteMany({});
        let result=await User.insertMany(usersData.users);
        return res.status(201).json(result);

    }catch(err){
        
        next(err);
    }


}

module.exports={seedController};