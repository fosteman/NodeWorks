//This app uses Service Locator pattern. Impractical, hard to identify relationships between components.

const svcLoc = require('./lib/serviceLocator')();
svcLoc.register('dbName', 'example-db');
svcLoc.register('tokenSecret', 'SHHH!');
svcLoc.factory('db', require('./lib/db'));
svcLoc.factory('authService', require('./lib/authService'));
svcLoc.factory('authController', require('./lib/authController'));
const authController = svcLoc.get('authController');

const express = require('express');
const errorHndlr = require('errorhandler');
const http = require('http');

const app = express();
app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);
app.use(errorHndlr());
app.listen(3000);
