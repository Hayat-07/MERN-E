const { Schema, model } = require("mongoose");
const bcrypt= require("bcrypt");

const {defaultImagepath}= require('../secret');
// const users=[
//     {id:1,name:"Hayat"},
//     {id:2,name:"Hayat2"},
//     {id:3,name:"Hayat3"},
//     {id:4,name:"Hayat4"}
// ];

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
        minlength:[6,"user name should be minimum 6 characters"],
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            },
            message:"Please enter a valid email"

        }
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Password should be minimum 6 characters"],
        set:(v)=>bcrypt.hashSync(v, bcrypt.genSaltSync(10))
       

    },
    image:{
        type:String,
        default:{
            defaultImagepath
        }
    },
    address:{
        type:String,
        required:[true, 'User Address is required'],
    },
    phone:{
        type:String,
        required:[true, 'Phone is required'],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBanned:{
        type:Boolean,
        default:false
    },


},{timestamps:true});


const User= model('Users',userSchema)





module.exports={User};