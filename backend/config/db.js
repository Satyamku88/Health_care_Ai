const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the .env file in the current directory (config folder)
dotenv.config({ path:'backend/config/.env' });
console.log("Mongo URI:", process.env.MONGO_URI); // Debug: Ensure it prints the correct URI

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
