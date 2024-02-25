const {authentication} = require('../middleware/authMiddleware');
const {apiEndpoints} = require("../common/constant");
const cartController = require('../controllers/cartController');
const express = require("express");
const router = express.Router();

//ADD product to cart

router.post(apiEndpoints.ADD_PRODUCT_TO_CART, authentication, cartController.addProductToCart);

//View the cart

router.get(apiEndpoints.GET_CART_DETAILS, authentication, cartController.getCartDetails);

//update the quantity

router.put(apiEndpoints.UPDATE_CART_DETAILS, authentication, cartController.updateCartDetails);

//remove the quantity

router.delete(apiEndpoints.REMOVE_CART_ITEM, authentication, cartController.removeItemFromCart);

module.exports = router;
