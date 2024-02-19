require('dotenv').config();
const serverPort= process.env.SERVER_PORT || 3002;
const mongoDBUrl=process.env.mongoDBUrl || 'mongodb://localhost:27017/MERN-E';
const defaultImagePath=process.env.IMAGE_PATH || 'public/images/users/default.jpg';

module.exports={serverPort, mongoDBUrl,defaultImagePath};