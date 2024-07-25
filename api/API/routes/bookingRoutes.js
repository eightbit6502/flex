const express = require('express');

const BookingController = require('../controllers/bookingController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes
router.get('/:id', BookingController.read);

// Protected routes
router.post('/', authenticateJWT, BookingController.create);
router.put('/:id', authenticateJWT, BookingController.update);
router.delete('/:id', authenticateJWT, BookingController.delete);

module.exports = router;