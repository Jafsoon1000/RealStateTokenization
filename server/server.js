const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const propertyRoutes = require('./routes/propertyRoutes.js');

dotenv.config();

const app = express();

// Allow all origins during development/testing; restrict in production via FRONTEND_URL
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// Connect to DB then handle routes
app.use('/api/properties', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({ message: 'Database connection failed', error: error.message });
  }
}, propertyRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
