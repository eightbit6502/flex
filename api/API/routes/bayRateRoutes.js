const express = require('express');

const BayRateController = require('../controllers/bayRateController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes
router.get('/:id', BayRateController.read);

// Protected routes
router.post('/', authenticateJWT, BayRateController.create);
router.put('/:id', authenticateJWT, BayRateController.update);
router.delete('/:id', authenticateJWT, BayRateController.delete);

module.exports = router;
