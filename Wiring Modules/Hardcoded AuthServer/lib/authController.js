//authController.js Responsible for handling HTTP requests and respones. Hardcoded stateful dependency is used.

const exports = module.exports;
const authService = require('authService');
exports.login = (req, res, next) => {
    //logic is delegated to authService
  authService.login(req.body.username, req.body.password, (err, result => {
      //
      next();
  }));
};
exports.checkToken = (req, res, next) => {
  authService.checkToken(req.query.token, (err, result) => {
      next();
  });
};
