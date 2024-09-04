const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true
  },
  stops: {
    type: [String],
    required: true
  },
  buses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus'
  }],
  peakHours: [{
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    frequency: {
      type: Number,
      required: true
    }
  }],
  trafficData: {
    type: String,
    enum: ['Light', 'Moderate', 'Heavy'],
    default: 'Light'
  },
  densityData: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  }
});

module.exports = mongoose.model('Route', routeSchema);
