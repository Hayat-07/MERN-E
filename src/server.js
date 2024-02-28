const express= require('express');
const morgan= require('morgan');

const bodyParser= require('body-parser');
const xssClean= require('xss-clean');
const rateLimit= require('express-rate-limit');

const app =express();
const {serverPort }=require('./secret');
const { userRouter } = require('./routers/userRouter');
const {mainPagerouter} = require('./routers/mainPageRouter');
const { connectDB } = require('./config/db');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');
const { sendMyMail } = require('./helpers/sendMail');




/////////////////////////////////middleWere///////////////////////////////
const rateLimiter=rateLimit({
    windowMs:6000,  //1  munite,
    max:5,
    message:'Too many requests from this IP. Please tryn again later'

})
app.use(morgan('dev'));
app.use(rateLimiter);
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static());
///////////Secure Api with= (xss-clean   &   express-rate-limit  )/////////







////////////////////////////////Api////////////////////////////////////////

app.use(mainPagerouter);
app.use('/api/users',userRouter);
app.use('/api/seed',seedRouter);

app.use('/api/send',(req,res)=>{
    sendMyMail(req,res,{
        from:"fiversuvo@gmail.com",
        to:"arch1607207@gmail.com",
        subject:"Email from  fiversuvo@ ",
        text:" This is an email sent from fversuvo to suvo1607207",
        myhtml:" this is html"
    });
});





















//////////////////////////////////Error handle//////////////////////////////////

//client error handling;
app.use((req,res,next)=>{
    res.status(404).json({ massage:"Route not found"});
    next();
})








//server error handling;
app.use((err,req,res,next)=>{
    
    console.error("From server.js",err.stack);

    return errorResponse(res,{
        statusCode:err.status,
        message:err.massage

    })
})

////////////////////////////////////////////////////////////////////////////////

app.listen(serverPort, async()=>{
    console.log(`Server is running on port${serverPort}`);
     connectDB();
});





