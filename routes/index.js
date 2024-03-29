const express = require("express");
const router = express.Router();

/* Routes for registration the user and login the user   */

router.use('/user', require('./user'));

/* Routes for categories  */

router.use('/category', require('./category'));

/* Routes for products */

router.use('/product', require('./product'));

/*Routes for Cart */

router.use('/cart', require('./cart'));


/*Routes for order */

router.use('/order', require('./order'));

module.exports = router;