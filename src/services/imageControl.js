const fs =require('fs').promises;




const imageDeleter=async(user)=>{
    try{

        const userImagePath= user.image;

       await fs.access(userImagePath)
       await fs.unlink(userImagePath)
       console.log("User Image is deleted.");

    }catch(err){
        console.error("User Image does not exist")
    }
};

module.exports={imageDeleter};








