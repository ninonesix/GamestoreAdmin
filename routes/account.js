const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/',accountController.index);
router.post('/',accountController.edit);
module.exports = router;