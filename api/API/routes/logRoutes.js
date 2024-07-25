const express = require('express');

const ChangeLogController = require('../controllers/changeLogController');
const { authenticateJWT, authenticateJWTWithLogging } = require('../middleware/authMiddleware');


const router = express.Router();

// web
router.get('/entity/:id/recent', authenticateJWT, async (req, res) => {
    req.entityType = 'Building';
    await ChangeLogController.getRecentLogsByEntity(req, res);
  });


router.get('/entity/:id/', authenticateJWT, async (req, res) => {
    req.entityType = 'Building';
    await ChangeLogController.getLogsByEntity(req, res);
  });
  
module.exports = router;
