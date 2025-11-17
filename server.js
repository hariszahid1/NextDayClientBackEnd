const express = require("express");
const app = express();
const cors = require('cors');
const nutritionRoutes = require('./routes/nutritionRoutes');
const clientsRoutes = require('./routes/clientsRoutes');
require("./db/connection"); // Ensure DB connection is established

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files if needed
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/clients', clientsRoutes);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
