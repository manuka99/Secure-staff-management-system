const express = require("express");
const router = express.Router();
const userRoutes = require("./route.user");
const msgRoutes = require("./route.message");

userRoutes(router);
msgRoutes(router);

module.exports = router;