const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  const { roomId, sender, content } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const newMessage = new Message({
      roomId,
      sender,
      content,
      timestamp: new Date(),
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const messages = await Message.find({ roomId });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserBio = async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id;

  try {
    const room = await Room.findById(roomId).populate('users', 'username bio');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const userBios = room.users.map(user => ({
      username: user.username,
      bio: user.bio,
    }));

    const user = await User.findById(userId, 'username bio');
    if (user) {
      const userBio = { username: user.username, bio: user.bio };
      if (!userBios.some(u => u.username === user.username)) {
        userBios.push(userBio);
      }
    }

    res.status(200).json(userBios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
