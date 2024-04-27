const express = require('express');
const router = express.Router();
const amazonController = require('../controllers/amazon.controller');

router
    .route('/api/scrape')
    .get(amazonController.get)

router
    .route('/')
    .get(amazonController.getHtml)

module.exports = router;