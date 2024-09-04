// routes/crewRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllCrew,
  getCrewById,
  addCrew,
  updateCrew,
  deleteCrew
} = require('../controllers/crewController.js');

// Get all crew members
router.get('/', getAllCrew);

// Get a single crew member by ID
router.get('/:id', getCrewById);

// Add a new crew member
router.post('/', addCrew);

// Update an existing crew member
router.put('/:id', updateCrew);

// Delete a crew member
router.delete('/:id', deleteCrew);

module.exports = router;
