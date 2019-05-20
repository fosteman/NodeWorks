//authService.js Checks user's credentials against db records
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
//Dependency injection. It's a factory with arguments to inject.
module.exports = (db, tokenSecret) => {
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
