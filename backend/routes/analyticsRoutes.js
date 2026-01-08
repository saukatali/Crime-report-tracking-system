const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

router.get('/stats', auth, analyticsController.getAnalytics);
router.get('/track/:trackingCode', analyticsController.trackComplaint);

module.exports = router;
