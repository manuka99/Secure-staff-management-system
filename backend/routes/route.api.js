const express = require("express");
const router = express.Router();
const userRoutes = require("./route.user");
const msgRoutes = require("./route.message");
const uploadRoutes = require("./route.upload");

userRoutes(router);
msgRoutes(router);
uploadRoutes(router);

module.exports = router;