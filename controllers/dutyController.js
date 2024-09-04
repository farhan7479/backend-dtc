// controllers/dutyController.js
const Duty = require('../models/Duty.js');
const Bus = require('../models/Bus.js');
const Crew = require('../models/Crew.js');

// Get all duties
const getAllDuties = async (req, res) => {
  try {
    const duties = await Duty.find().populate('bus').populate('crew');
    res.json(duties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single duty by ID
const getDutyById = async (req, res) => {
  try {
    const duty = await Duty.findById(req.params.id).populate('bus').populate('crew');
    if (!duty) return res.status(404).json({ message: 'Duty not found' });
    res.json(duty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new duty
const addDuty = async (req, res) => {
  try {
    const { busId, crewId, dutyType, startTime, endTime, restPeriod ,name} = req.body;

    // Ensure bus and crew are available and not already assigned
    const bus = await Bus.findById(busId);
    const crew = await Crew.findById(crewId);
    console.log(bus);
    console.log(crew);
    

    if (!bus || !crew) return res.status(404).json({ message: 'Bus or Crew not found' });
    if (bus.isAssigned || crew.isOnDuty)
      return res.status(400).json({ message: 'Bus or Crew is already assigned' });

    const newDuty = new Duty({ bus: busId, crew: crewId, dutyType, startTime, endTime, restPeriod ,name});
    await newDuty.save();

    // Update the assigned status of bus and crew
    bus.isAssigned = true;
    bus.currentRoute = null; // or update with route info
    await bus.save();

    crew.isOnDuty = true;
    crew.assignedBus = busId;
    await crew.save();

    res.status(201).json(newDuty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing duty
const updateDuty = async (req, res) => {
  try {
    const { busId, crewId, dutyType, startTime, endTime, restPeriod } = req.body;
    const duty = await Duty.findByIdAndUpdate(
      req.params.id,
      { bus: busId, crew: crewId, dutyType, startTime, endTime, restPeriod },
      { new: true }
    );
    if (!duty) return res.status(404).json({ message: 'Duty not found' });
    res.json(duty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a duty
const deleteDuty = async (req, res) => {
  try {
    const duty = await Duty.findByIdAndDelete(req.params.id);
    if (!duty) return res.status(404).json({ message: 'Duty not found' });

    // Update the assigned status of bus and crew
    const bus = await Bus.findById(duty.bus);
    const crew = await Crew.findById(duty.crew);

    if (bus) {
      bus.isAssigned = false;
      bus.currentRoute = null;
      await bus.save();
    }

    if (crew) {
      crew.isOnDuty = false;
      crew.assignedBus = null;
      await crew.save();
    }

    res.json({ message: 'Duty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllDuties, getDutyById, addDuty, updateDuty, deleteDuty };
