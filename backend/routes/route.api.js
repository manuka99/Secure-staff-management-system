const express = require("express");
const router = express.Router();
const userRoutes = require("./route.user");

userRoutes(router);

module.exports = router;