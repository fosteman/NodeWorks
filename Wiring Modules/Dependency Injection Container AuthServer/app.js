//This app uses Dependency Injection Container pattern.
const diC = require('./lib/diContainer');
diC.register('dbName', 'example-db');
diC.register('tokenSecret', 'secret');
diC.factory('db', require('./lib/db'));
diC.factory('authService', require('./lib/authService'));
diC.factory('authController', require('./lib/authController'));
//invocation of service locator is inevitable
const authController = diC.get('authController');

const express = require('express');
const errorHndlr = require('errorhandler');

const app = express();
app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);
app.use(errorHndlr());
app.listen(3000);
