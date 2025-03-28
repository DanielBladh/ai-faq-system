const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Enable more detailed logging
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseAnonKey ? "Present" : "Missing");

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: false,
  },
  global: {
    headers: { "x-my-custom-header": "my-app-name" },
  },
});

module.exports = { supabase };
