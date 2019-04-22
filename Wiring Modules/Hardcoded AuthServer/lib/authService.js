//authService.js Checks user's credentials against db records
const db = require('db');
const users = db.sublevel('users');
const token = 'secret';

//checks user\pass
module.exports.login = (username, pass, cb) => users.get(username, function (err, user) {
    //TODO
});
//takes in token, verifies validity
module.exports.checkToken = (token, cb) => {
    //
    users.get(userData.username, function (err, user) {
        //
    });
};
