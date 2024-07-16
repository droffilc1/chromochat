const express = require('express');
const Room = require('../models/Room');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the room
 *         users:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs in the room
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API endpoints for managing chat rooms
 */

/**
 * @swagger
 * /rooms/create:
 *   post:
 *     summary: Create a new chat room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Room already exists
 */
router.post('/create', async (req, res) => {
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
});

/**
 * @swagger
 * /rooms/join:
 *   post:
 *     summary: Join an existing chat room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Joined room successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 */
router.post('/join', async (req, res) => {
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
});

module.exports = router;
