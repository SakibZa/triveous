const {authenticateAdmin} = require('../middleware/authMiddleware');
const {apiEndpoints} = require("../common/constant");
const productController = require('../controllers/productController');
const express = require("express");
const routes = express.Router();
// add product 
routes.post(apiEndpoints.ADD_PRODUCT , authenticateAdmin, productController.addProduct);

//update product
routes.put(apiEndpoints.UPDATE_PRODUCT , authenticateAdmin, productController.updateProduct);


//get list of products according to category id

routes.get(apiEndpoints.GET_LIST_PRODUCTS, productController.getProducts);

//get product details
routes.get(apiEndpoints.GET_PRODUCT_DETAILS, productController.getProductDetails);

module.exports = routes;