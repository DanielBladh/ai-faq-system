const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes import
const faqRoutes = require("./routes/faqRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Load environment variables
dotenv.config();

const { supabase } = require("./supabaseClient"); // Import the supabase client from supabaseClient.js

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/upload", uploadRoutes);

// Make supabase client available to all routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Routes
app.use("/api/faq", faqRoutes);
app.use("/api/upload", uploadRoutes); // Add this line

// Basic route for testing
app.get("/", (req, res) => {
  res.send("AI FAQ System API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
