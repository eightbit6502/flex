const express = require('express');
const router = express.Router();
const BuildingTenantController = require('../controllers/buildingTenantController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');

// web
router.get('/:buildingId/tenants', authenticateJWT, BuildingTenantController.getTenantsByBuilding);
router.delete('/:buildingId/tenants/:tenantId', authenticateJWT, BuildingTenantController.deleteTenantFromBuilding);

// api crud
router.post('/', authenticateJWT, BuildingTenantController.create);
router.get('/:id', authenticateJWT, BuildingTenantController.read);
router.delete('/:id', authenticateJWT, BuildingTenantController.delete);




module.exports = router;