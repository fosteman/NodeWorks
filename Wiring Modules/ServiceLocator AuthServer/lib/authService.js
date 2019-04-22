//authService.js Checks user's credentials against db records
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
module.exports = serviceLocator => {
    const db = serviceLocator.get('db'); //db handle
    const tokenSecret = serviceLocator.get('secret'); //config parameter

    const users = db.sublevel('users');
    const authService = {};
    authService.login = (username, pass, cb) => users.get(username, function (err, user) {
        //TODO
    });
    authService.checkToken = (token, cb) => {
        //
        users.get(userData.username, function (err, user) {
            //
        });
    };
    return authService;
};
