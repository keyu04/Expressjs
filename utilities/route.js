const express = require('express');
const routes = express.Router();
const controllers = require('../app/controllers/controller');


routes.post('/record', controllers.userController.createRecord);
routes.get('/record/:name', controllers.userController.displayRecord);

module.exports = routes