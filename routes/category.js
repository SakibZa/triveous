const express = require('express'); 
const routes = express.Router();
const {authenticateAdmin} = require('../middleware/authMiddleware');
const {apiEndpoints} = require("../common/constant");
const categoryController = require('../controllers/categoryController');

// routes for adding the categories in databse 
//only admin can add the category
routes.post(apiEndpoints.ADD_CATEGORY, authenticateAdmin, categoryController.addProduct);

//for getting the list of categories

routes.get(apiEndpoints.GET_LIST_CATEGORTIES, categoryController.getCategories);

routes.put(apiEndpoints.UPDATE_CATEGORY, authenticateAdmin, categoryController.updateCategory);

module.exports = routes; 