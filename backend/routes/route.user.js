const controller_user = require("../controllers/controller.user");

module.exports = function (router) {
    router.post('/user/register', controller_user.register_user);
    router.post('/user/login', controller_user.login_user);


    return router;
}