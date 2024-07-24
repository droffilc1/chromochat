const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const socketIo = require("socket.io");
const Message = require("./models/Message");
const User = require("./models/User");
const { swaggerUi, specs } = require("./swagger");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/rooms");
const messageRoutes = require("./routes/messages");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/users");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

// Use routes
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);
app.use("/profile", profileRoutes);
app.use("/users", userRoutes);


// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Sample route
app.get("/", (req, res) => {
    res.send("Chat app backend");
});

// Database connection
mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Socket.io setup
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinRoom", async ({ username, roomId }) => {
        const user = await User.findOne({ username });
        socket.join(roomId);
        socket.to(roomId).emit("message", `${username} has joined the room`);
    });

    socket.on("chatMessage", async (msg) => {
        const newMessage = new Message({
            room: roomId,
            user: user._id,
            text: msg,
        });

        await newMessage.save();
        io.to(roomId).emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
