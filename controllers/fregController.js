const Route = require('../models/Route');

// Get peak time bus frequencies
exports.getPeakFrequencies = async (req, res) => {
  try {
    const routes = await Route.find({}, 'routeName peakHours');
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set peak time frequency
exports.setPeakFrequency = async (req, res) => {
  const { routeId, peakHours, frequency } = req.body;
  try {
    const route = await Route.findById(routeId);
    if (route) {
      route.peakHours = peakHours.map(hour => ({ ...hour, frequency }));
      await route.save();
      res.json(route);
    } else {
      res.status(404).json({ message: 'Route not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adjust bus frequency based on traffic
exports.adjustFrequencyBasedOnTraffic = async (req, res) => {
  const { routeId, trafficCondition } = req.body;
  try {
    const route = await Route.findById(routeId);
    if (route) {
      let adjustment;
      switch (trafficCondition) {
        case 'Light':
          adjustment = 15; // Increase frequency (e.g., every 15 minutes)
          break;
        case 'Moderate':
          adjustment = 10; // Increase frequency (e.g., every 10 minutes)
          break;
        case 'Heavy':
          adjustment = 5; // Increase frequency (e.g., every 5 minutes)
          break;
        default:
          adjustment = 10;
      }
      route.peakHours.forEach(hour => {
        hour.frequency = adjustment;
      });
      await route.save();
      res.json(route);
    } else {
      res.status(404).json({ message: 'Route not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
