const express = require('express');
const router = express.Router();
const {
  getAllBuses,
  getBusById,
  addBus,
  updateBus,
  deleteBus
} = require('../controllers/busController.js');

// Route to get all buses
router.get('/', getAllBuses);

// Route to get a single bus by ID
router.get('/:id', getBusById);

// Route to add a new bus
router.post('/', addBus);

// Route to update an existing bus
router.put('/:id', updateBus);

// Route to delete a bus
router.delete('/:id', deleteBus);

module.exports = router;
