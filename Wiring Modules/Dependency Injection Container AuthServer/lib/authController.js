//authController.js Responsible for handling HTTP requests and respones.
// It is stateless, now dependency injectable. (argument is provided to the factory)
module.exports = (authService) => {
    authController = {};
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

