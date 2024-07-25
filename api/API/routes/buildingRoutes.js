const express = require('express');

const BuildingController = require('../controllers/buildingController');
const ChangeLogController = require('../controllers/changeLogController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// Public routes
router.get('/:id', authenticateJWT, BuildingController.read);

// Protected routes
router.get('/', authenticateJWT, BuildingController.readAll);
router.post('/', authenticateJWT, BuildingController.create);
router.put('/:id', authenticateJWT, BuildingController.update);
router.delete('/:id', authenticateJWT, BuildingController.delete);

// web
// router.get('/:id/changes', authenticateJWT, async (req, res) => {
//     req.entityType = 'Building';
//     await ChangeLogController.getLogsByEntity(req, res);
//   });


module.exports = router;
