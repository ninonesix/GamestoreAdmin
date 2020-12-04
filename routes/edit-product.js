const express = require('express');
const router = express.Router();
const editproductController = require('../controllers/editproductController');

/* GET home page. */
router.get('/:id',editproductController.edit);
router.post('/:id',editproductController.editproduct);

module.exports = router;