// controllers/crewController.js
const Crew = require('../models/Crew.js');

// Get all crew members
const getAllCrew = async (req, res) => {
  try {
    const crews = await Crew.find().populate('assignedBus');
    res.json(crews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single crew member by ID
const getCrewById = async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.id).populate('assignedBus');
    if (!crew) return res.status(404).json({ message: 'Crew member not found' });
    res.json(crew);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new crew member
const addCrew = async (req, res) => {
  try {
    const { name, employeeId, shiftHours ,assignedBus} = req.body;
    
    const newCrew = new Crew({ name, employeeId, shiftHours,assignedBus });
    await newCrew.save();
    res.status(201).json(newCrew);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing crew member
const updateCrew = async (req, res) => {
  try {
    const { name, employeeId, shiftHours } = req.body;
    const crew = await Crew.findByIdAndUpdate(
      req.params.id,
      { name, employeeId, shiftHours },
      { new: true }
    );
    if (!crew) return res.status(404).json({ message: 'Crew member not found' });
    res.json(crew);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a crew member
const deleteCrew = async (req, res) => {
  try {
    const crew = await Crew.findByIdAndDelete(req.params.id);
    if (!crew) return res.status(404).json({ message: 'Crew member not found' });
    res.json({ message: 'Crew member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCrew, getCrewById, addCrew, updateCrew, deleteCrew };
