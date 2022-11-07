const express = require('express');
const router = express.Router();
const controller_user = require("../controllers/controller.user");

module.exports = function () {
    router.post('/register', controller_user.register_user);
    router.post('/login', controller_user.login_user);


    return router;
}