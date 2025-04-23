const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Starting server...");
