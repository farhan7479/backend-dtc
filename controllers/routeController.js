// controllers/routeController.js
const Route = require('../models/Route.js');
const Bus = require('../models/Bus.js');

// Get all routes
const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate('buses');
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single route by ID
const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('buses');
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new route
const addRoute = async (req, res) => {
    const { routeName, stops, buses, peakHours, trafficData, densityData } = req.body;
    const route = new Route({ routeName, stops, buses, peakHours, trafficData, densityData });
    try {
      const newRoute = await route.save();
      res.status(201).json(newRoute);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update route
  const updateRoute = async (req, res) => {
    try {
      const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (route) res.json(route);
      else res.status(404).json({ message: 'Route not found' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update traffic and density data
  const updateTrafficAndDensity = async (req, res) => {
    const { routeId, trafficCondition, density } = req.body;
    try {
      const route = await Route.findById(routeId);
      if (route) {
        route.trafficData = trafficCondition;
        route.densityData = density;
        await route.save();
        res.json(route);
      } else {
        res.status(404).json({ message: 'Route not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const startBusRoute = async (req, res) => {
    const { busId, routeId } = req.body;
    try {
      const bus = await Bus.findById(busId);
      const route = await Route.findById(routeId);
  
      if (!bus || !route) {
        return res.status(404).json({ message: 'Bus or Route not found' });
      }
  
      // Set start time and update bus status
      bus.startTime = new Date();
      bus.status = 'OnRoute';
      bus.currentRoute = routeId;
  
      // Add bus to activeBuses in the route
      route.activeBuses.push({
        bus: bus._id,
        startTime: bus.startTime
      });
  
      await bus.save();
      await route.save();
  
      res.json({ message: 'Bus route started', bus, route });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // End bus route (like punch-out)
  const endBusRoute = async (req, res) => {
    const { busId } = req.body;
    try {
      const bus = await Bus.findById(busId);
      if (!bus || bus.status !== 'OnRoute') {
        return res.status(404).json({ message: 'Bus not found or not on a route' });
      }
  
      // Set end time and update bus status
      bus.endTime = new Date();
      bus.status = 'Completed';
  
      const route = await Route.findById(bus.currentRoute);
      if (route) {
        const activeBus = route.activeBuses.find(ab => ab.bus.toString() === busId);
        if (activeBus) {
          activeBus.endTime = bus.endTime;
        }
        await route.save();
      }
  
      await bus.save();
  
      res.json({ message: 'Bus route ended', bus, route });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
 
// Delete a route
const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

module.exports = { getAllRoutes, getRouteById, addRoute, updateRoute, deleteRoute,updateTrafficAndDensity,startBusRoute, endBusRoute };
