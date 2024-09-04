const express = require('express');
const router = express.Router();
const {
  getAllRoutes,
  getRouteById,
  addRoute,
  updateRoute,
  updateTrafficAndDensity
} = require('../controllers/routeController');

router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.post('/', addRoute);
router.put('/:id', updateRoute);
router.put('/update-data', updateTrafficAndDensity);

module.exports = router;
