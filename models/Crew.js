const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  isOnDuty: { type: Boolean, default: false },
  assignedBus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  shiftHours: { type: Number, default: 8 },
});

module.exports = mongoose.model('Crew', crewSchema);
