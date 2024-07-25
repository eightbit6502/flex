const express = require('express');

const BayController = require('../controllers/bayController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes
router.get('/:id', BayController.read);

// Protected routes
router.post('/', authenticateJWT, BayController.create);
router.put('/:id', authenticateJWT, BayController.update);
router.delete('/:id', authenticateJWT, BayController.delete);

module.exports = router;
