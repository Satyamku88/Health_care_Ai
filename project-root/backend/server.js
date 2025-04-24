require('dotenv').config(); // Load environment variables first
const mongoose = require('mongoose');
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});