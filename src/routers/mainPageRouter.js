const express= require('express');
const mainPagerouter= express.Router();



mainPagerouter.get("/",(req,res)=>{
    res.status(201).send({
        massagr:"This is Home page server."
    })
});

module.exports={mainPagerouter};