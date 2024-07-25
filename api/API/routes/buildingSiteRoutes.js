const express = require('express');
const router = express.Router();
const BuildingSiteController = require('../controllers/buildingSiteController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');

// web
router.get('/:buildingId/sites', authenticateJWT, BuildingSiteController.getSitesByBuilding);
router.delete('/:buildingId/sites/:siteId', authenticateJWT, BuildingSiteController.deleteSiteFromBuilding);

// api
router.post('/', authenticateJWT, BuildingSiteController.create);
router.get('/:id', authenticateJWT, BuildingSiteController.read);
router.delete('/:id', authenticateJWT, BuildingSiteController.delete);


module.exports = router;