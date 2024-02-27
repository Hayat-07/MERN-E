const nodeMailer= require('nodemailer');

const sendMyMail=async(req,res,data={})=>{

   const testAccount= await nodeMailer.createTestAccount();


   const transporter =await nodeMailer.createTransport({
       service:'gmail',
       host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
    });

   try{
    const info = await transporter.sendMail({
      from: 'fiversuvo@gmail.com', // sender address
      to: [data.to], // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.myhtml, // html body
    });

    console.log("Message sent:", info.messageId);


   console.log(info.response);
   return res.json(info);

   
   }catch(err){
    console.error('Error occured while sending email');
    throw err;
   }
};


module.exports={ sendMyMail};