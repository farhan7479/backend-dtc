const express = require('express');
const router = express.Router();
const {
  getPeakFrequencies,
  setPeakFrequency,
  adjustFrequencyBasedOnTraffic
} = require('../controllers/frequencyController');

router.get('/peak-frequencies', getPeakFrequencies);
router.put('/peak-frequencies/:routeId', setPeakFrequency);
router.put('/traffic-adjustments', adjustFrequencyBasedOnTraffic);

module.exports = router;
