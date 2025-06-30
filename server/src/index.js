require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();

// Make JWT_SECRET available globally
process.env.JWT_SECRET = config.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth');
const letterRoutes = require('./routes/letters');
const quoteRoutes = require('./routes/quotes');
const forumRoutes = require('./routes/forum');
const testRoutes = require('./routes/test');

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Future Us API is running' });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/letters', letterRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/test', testRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log('- POST /api/auth/signup - Create account');
  console.log('- POST /api/auth/signin - Sign in');
  console.log('- GET /api/letters - Get letters');
  console.log('- POST /api/test/test-email - Test email configuration');
}); 