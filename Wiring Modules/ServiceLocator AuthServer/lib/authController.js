//authController.js Responsible for handling HTTP requests and respones.
module.exports = serviceLocator => {
    const authService = serviceLocator.get('authService');
    const authController = {};
    authController.login = (req, res, next) => {
        //logic is delegated to authService
        authService.login(req.body.username, req.body.password, (err, result => {
            //
            next();
        }));
    };
    authController.checkToken = (req, res, next) => {
        authService.checkToken(req.query.token, (err, result) => {
            next();
        });
    };
    return authController;
};

