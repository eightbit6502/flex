const express = require('express');

const RateController = require('../controllers/rateController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes


// Protected routes
router.get('/', RateController.readAll);
router.get('/:id', RateController.read);
router.post('/', authenticateJWT, RateController.create);
router.put('/:id', authenticateJWT, RateController.update);
router.delete('/:id', authenticateJWT, RateController.delete);

module.exports = router;
