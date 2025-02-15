const express = require('express');
const routes = express.Router();
const controllers = require('../app/controllers/controller');
const joiSchema = require('../app/middleware/joiSchema');


routes.post('/auth/users/register', joiSchema.userSchema.userRegistration, controllers.userController.userRegistration);
routes.post('/auth/users/login', joiSchema.userSchema.userLogin, controllers.userController.userLogin);
routes.post('/auth/users/logout', joiSchema.userSchema.userLogout, controllers.userController.userLogout);
routes.get('/auth/users/list', controllers.userController.userList);
routes.get('/auth/users/display', joiSchema.userSchema.userDisplay, controllers.userController.userDisplay);

module.exports = routes