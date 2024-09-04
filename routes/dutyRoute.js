// routes/dutyRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllDuties,
  getDutyById,
  addDuty,
  updateDuty,
  deleteDuty
} = require('../controllers/dutyController.js');

// Get all duties
router.get('/', getAllDuties);

// Get a single duty by ID
router.get('/:id', getDutyById);

// Add a new duty
router.post('/', addDuty);

// Update an existing duty
router.put('/:id', updateDuty);

// Delete a duty
router.delete('/:id', deleteDuty);

module.exports = router;
