const express = require("express");
const router = express.Router();
const {authentication} = require('../middleware/authMiddleware');
const {apiEndpoints} = require("../common/constant");
const orderController = require('../controllers/orderController');

//for order place
router.post(apiEndpoints.ORDER_PLACE, authentication, orderController.orderPlace);

// for retreive the order details for authenticate user

router.get(apiEndpoints.GET_ORDER_DETAILS , authentication, orderController.getOrderDetails);

// retrieve the order detail from order id

router.get(apiEndpoints.GET_ORDER_DETAILS_BY_ID, authentication, orderController.getOrderDetailsById);

module.exports = router;

// get-order-details-by-id