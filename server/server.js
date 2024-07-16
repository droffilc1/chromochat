const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const socketIo = require("socket.io");
const authRoutes = require('./routes/auth');
const roomRoute = require('./routes/rooms');
const Message = require('./models/Message');
const User = require("./models/User");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoute);

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

  socket.on('joinRoom', async ({ username, roomId }) => {
    const user = await User.findOne({ username });
    socket.join(roomId);
    socket.to(roomId).emit('message', `${username} has joined the room`);
  });

  socket.on('chatMessage', async (msg) => {
    const newMessage = new Message({
      room: roomId,
      user: user._id,
      text: msg,
    });

    await newMessage.save();
    io.to(roomId).emit('message', msg);
  });

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
