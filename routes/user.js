const express = require("express");
const router = express.Router();
const LHTLogger = require("../utils/logger");
const {apiEndpoints} = require("../common/constant");
const userController = require("../controllers/userController");

router.post(apiEndpoints.REGISTER,userController.register);

router.get(apiEndpoints.LOGIN,userController.login);

module.exports = router;