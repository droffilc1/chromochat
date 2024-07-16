const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const socketIo = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(cors());

// Sample route
app.get("/", (req, res) => {
  res.send('Chat app backend');
});

// Database connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Press CTRL + C to stop it!`);
})
