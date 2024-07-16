const express = require('express');
const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - roomId
 *         - sender
 *         - content
 *       properties:
 *         roomId:
 *           type: string
 *           description: ID of the room where the message was sent
 *         sender:
 *           type: string
 *           description: ID of the user who sent the message
 *         content:
 *           type: string
 *           description: Content of the message
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Time when the message was sent
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for managing messages
 */

/**
 * @swagger
 * /messages/send:
 *   post:
 *     summary: Send a message to a chat room
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 */
router.post('/send', async (req, res) => {
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
});

/**
 * @swagger
 * /messages/{roomId}:
 *   get:
 *     summary: Retrieve messages from a chat room
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Room not found
 */
router.get('/:roomId', async (req, res) => {
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
});

/**
 * @swagger
 * /messages/users/{roomId}:
 *   get:
 *     summary: Retrieve bios of users in a chat room
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room
 *     responses:
 *       200:
 *         description: List of users with their bios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   bio:
 *                     type: string
 *       404:
 *         description: Room not found
 */
router.get('/users/:roomId', async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId).populate('users', 'username bio');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const users = room.users.map(user => ({
      username: user.username,
      bio: user.bio,
    }));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
