const express = require('express');

const GroupUserController = require('../controllers/groupUserController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes
router.get('/:id', GroupUserController.read);

// Protected routes
router.post('/', authenticateJWT, GroupUserController.create);
router.put('/:id', authenticateJWT, GroupUserController.update);
router.delete('/:id', authenticateJWT, GroupUserController.delete);

module.exports = router;
