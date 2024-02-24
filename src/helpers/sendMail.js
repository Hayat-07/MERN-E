const nodeMailer= require('nodemailer');

const sendMyMail=async(req,res,options={})=>{

   const testAccount= await nodeMailer.createTestAccount();


   const transporter =await nodeMailer.createTransport({
       service:'gmail',
       host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'fiversuvo@gmail.com',
        pass: 'yjmzbtvpinhcicpj'
    },
    });

   try{
    const info = await transporter.sendMail({
      from: 'fiversuvo@gmail.com', // sender address
      to: ["suvo1607207@gmail.com"], // list of receivers
      subject: "Hello by Hayat ✔", // Subject line
      text: "Hello world by Hayat?", // plain text body
      html: "<b>Hello world by Hayat?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);



   return res.json(info);

   
   }catch(err){
    throw new Error(err);
   }
};


module.exports={ sendMyMail};