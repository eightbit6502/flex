const express = require('express');

const SiteController = require('../controllers/siteController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes

// Protected routes
router.get('/', authenticateJWT, SiteController.readAll);
router.get('/:id', authenticateJWT, SiteController.read);
router.post('/', authenticateJWT, SiteController.create); // Create route
router.put('/:id', authenticateJWT, SiteController.update);  // Update route
router.delete('/:id', authenticateJWT, SiteController.delete); // Delete route

module.exports = router;
