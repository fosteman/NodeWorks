//This app uses Dependency Factory Injection pattern.



const express = require('express');
const errorHndlr = require('errorhandler');
const http = require('http');
//Verbose dependency graph
const db = require('./lib/db')('db-name-sample');
const authService = require('./lib/authService')(db, 'secret');
const authController = require('./lib/authController')(authService);

const app = express();
app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);
app.use(errorHndlr());
app.listen(3000);
