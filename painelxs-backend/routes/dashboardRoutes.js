const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rotas Dashboard
router.post('/', dashboardController.createDashboardRecord);
router.get('/', dashboardController.getAllDashboardRecords);
router.get('/:id', dashboardController.getDashboardRecordById);
router.put('/:id', dashboardController.updateDashboardRecord);
router.delete('/:id', dashboardController.deleteDashboardRecord);

module.exports = router;
