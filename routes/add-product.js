const express = require('express');
const router = express.Router();
const addproductController = require('../controllers/addproductController');
/* GET home page. */
router.get('/',addproductController.add);
router.post('/',addproductController.addproduct);


module.exports = router;