const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/',indexController.index);
router.get('/user/:id',indexController.user);
router.post('/user/block/:id',indexController.block)
module.exports = router;
