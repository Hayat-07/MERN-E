const express= require('express');
const seedRouter =express.Router();
const { seedController } = require('../controllers/seedController');


seedRouter.get('/users', seedController);

module.exports={seedRouter};

