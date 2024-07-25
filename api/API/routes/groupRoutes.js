const express = require('express');

const GroupController = require('../controllers/groupController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes
router.get('/:id', GroupController.read);

// Protected routes
router.post('/', authenticateJWT, GroupController.create);
router.put('/:id', authenticateJWT, GroupController.update);
router.delete('/:id', authenticateJWT, GroupController.delete);

module.exports = router;
