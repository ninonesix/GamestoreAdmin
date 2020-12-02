const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

/* GET home page. */
router.get('/',reportController.index);

module.exports = router;