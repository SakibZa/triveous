const express = require("express");
const router = express.Router();

/* Routes for registration the user and login the user   */

router.use('/user', require('./user'));



module.exports = router;