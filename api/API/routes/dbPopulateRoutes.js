const express = require('express');

const DbPopulateController = require('../controllers/dbPopulateController');

const router = express.Router();


router.get('/dummy', DbPopulateController.defaultDummyData);
router.get('/reset', DbPopulateController.resetDatabase);


module.exports = router;