const express = require('express');
const router = express.Router();
const {
  getAllRoutes,
  getRouteById,
  addRoute,
  updateRoute,
  updateTrafficAndDensity,
  deleteRoute
} = require('../controllers/routeController');

router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.post('/', addRoute);
router.put('/:id', updateRoute);
router.put('/update-data', updateTrafficAndDensity);
router.delete('/:id', deleteRoute );

module.exports = router;
