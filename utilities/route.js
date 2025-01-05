const express = require('express');
const routes = express.Router();
const controllers = require('../app/controllers/controller');
const joiSchema = require('../app/middleware/joiSchema');


routes.post('/auth/users/register', joiSchema.userSchema.userRegistration, controllers.userController.userRegistration);
routes.post('/auth/users/login', joiSchema.userSchema.userLogin, controllers.userController.userLogin);

module.exports = routes