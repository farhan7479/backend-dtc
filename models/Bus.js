const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  currentRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  isAssigned: { type: Boolean, default: false },
});

module.exports = mongoose.model('Bus', busSchema);
