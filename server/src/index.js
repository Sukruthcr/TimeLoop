require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();

// --- CORS Configuration for Deployment ---
const allowedOrigins = [
  'http://localhost:5173', // Your local frontend
  'https://time-loop-whyr.vercel.app', // Your main production frontend URL
  /^https:\/\/time-loop-whyr-.*\.vercel\.app$/ // Regex to match all Vercel preview URLs
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('CORS Request from Origin:', origin);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      }
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      callback(new Error(msg), false);
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
// -----------------------------------------

// Make JWT_SECRET available globally
process.env.JWT_SECRET = config.JWT_SECRET;

// Middleware
// app.use(cors()); // This is now replaced by the configuration above
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