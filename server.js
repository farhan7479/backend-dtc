const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors())

// Route Imports
const busRoutes = require('./routes/busRoute');
const crewRoutes = require('./routes/crewRoute');
const dutyRoutes = require('./routes/dutyRoute');
const routeRoutes = require('./routes/routeRoute');
const frequencyRoutes = require('./routes/routeRoute');

// Use Routes
app.use('/api/buses', busRoutes);
app.use('/api/crews', crewRoutes);
app.use('/api/duties', dutyRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/frequencies', frequencyRoutes);


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
