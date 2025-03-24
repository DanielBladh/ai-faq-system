const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Routes import
const faqRoutes = require('./routes/faqRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Make supabase client available to all routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Routes
app.use('/api/faq', faqRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('AI FAQ System API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;