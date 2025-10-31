const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, trainingController.addTraining);
router.get('/mine', authenticateToken, trainingController.getMyTrainings);
router.get('/user/:userId', authenticateToken, trainingController.getUserTrainings);
router.delete('/:id', authenticateToken, trainingController.deleteTraining);
router.get('/consolidate/:userId', authenticateToken, trainingController.consolidatePace);
router.get('/consolidate/all', authenticateToken, trainingController.consolidateAllPaces);
router.get('/group', authenticateToken, trainingController.groupByPace);

module.exports = router;