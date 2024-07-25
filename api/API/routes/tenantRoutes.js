const express = require('express');

const TenantController = require('../controllers/tenantController'); // Adjust the path as needed
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes

// Protected routes
router.get('/', authenticateJWT, TenantController.readAll); // Read route
router.get('/:id', authenticateJWT, TenantController.read); // Read route
router.post('/', authenticateJWT, TenantController.create); // Create route
router.put('/:id', authenticateJWT, TenantController.update);  // Update route
router.delete('/:id', authenticateJWT, TenantController.delete); // Delete route

module.exports = router;
