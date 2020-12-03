const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const addproductController = require('../controllers/addproductController');
/* GET home page. */
router.get('/',productController.add);
router.post('/',addproductController.addproduct);


module.exports = router;