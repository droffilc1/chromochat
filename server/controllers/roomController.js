const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const { name } = req.body;

  try {
    const room = await Room.findOne({ name });
    if (room) {
      return res.status(400).json({ message: 'Room already exists' });
    }

    const newRoom = new Room({ name });
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinRoom = async (req, res) => {
  const { name, userId } = req.body;

  try {
    const room = await Room.findOne({ name });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.users.push(userId);
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
