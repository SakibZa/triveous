const express = require("express");
const router = express.Router();

/* Routes for registration the user and login the user   */

router.use('/user', require('./user'));

/* Routes for categories  */

router.use('/category', require('./category'));

module.exports = router;