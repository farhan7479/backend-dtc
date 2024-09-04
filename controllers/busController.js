// controllers/busController.js
const Bus = require('../models/Bus.js');

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('currentRoute');
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single bus by ID
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('currentRoute');
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new bus
const addBus = async (req, res) => {
  try {
    const { busNumber, capacity } = req.body;
    const newBus = new Bus({ busNumber, capacity });
    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing bus
const updateBus = async (req, res) => {
  try {
    const { busNumber, capacity ,currentRoute, isAssigned} = req.body;
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { busNumber, capacity , currentRoute, isAssigned},
      { new: true }
    );
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bus
const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllBuses, getBusById, addBus, updateBus, deleteBus };
