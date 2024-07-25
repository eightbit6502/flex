const express = require('express');

const GroupBayRateController = require('../controllers/groupBayRateController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes
router.get('/:id', GroupBayRateController.read);

// Protected routes
router.post('/', authenticateJWT, GroupBayRateController.create);
router.put('/:id', authenticateJWT, GroupBayRateController.update);
router.delete('/:id', authenticateJWT, GroupBayRateController.delete);

module.exports = router;
