const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  currentRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  isAssigned: { type: Boolean, default: false },
  isAC: { type: Boolean, default: false }, // Indicates if the bus has air conditioning
  condition: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Poor'], default: 'Good' }, // Condition of the bus
  gender: { type: String, enum: ['Male', 'Female', 'General'], default: 'General' } // Gender-specific designation, if applicable
});

module.exports = mongoose.model('Bus', busSchema);
