const express = require('express');
const errorHndlr = require('errorhandler');
const http = require('http');
const authController = require('./lib/authController');
const app = express();
app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);
app.use(errorHndlr());
app.listen(3000);
