const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/consultations", require("./routes/consultations"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/emergency", require("./routes/emergency"));
app.use("/api/symptoms", require("./routes/symptoms"));

// Default route
app.get("/", (req, res) => {
  res.send("AI Healthcare Platform Backend");
});

module.exports = app;
