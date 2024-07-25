const express = require('express');

const SearchController = require('../controllers/searchController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/daily', SearchController.searchDailyParking);
//router.post('/hourly', SearchController.searchHourlyBays);

// Protected routes


module.exports = router;