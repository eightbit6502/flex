const express = require('express');

const UserController = require('../controllers/userController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.post('/activate', UserController.activateAccount);
router.post('/forgot', UserController.forgotPassword);
router.post('/reset', UserController.resetPassword);

// Private routes
router.post('/signout', authenticateJWT, UserController.signOut);
router.post('/', authenticateJWT, UserController.create);
router.get('/', authenticateJWT, UserController.readAll);
router.get('/:id', authenticateJWT, UserController.read);
router.put('/:id', authenticateJWT, UserController.update);
router.delete('/:id', authenticateJWT, UserController.delete);


// don't document - used in dev to create a super admin
// TODO need to disable once out of dev env
router.post('/createSuperAdmin', UserController.createSuperAdmin);


module.exports = router;