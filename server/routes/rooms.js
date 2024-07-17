const express = require('express');
const roomController = require('../controllers/roomController');
const authenticateToken = require('../middleware/auth');

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
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */
router.post('/create', authenticateToken, roomController.createRoom);

/**
 * @swagger
 * /rooms/join:
 *   post:
 *     summary: Join an existing chat room
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/join', authenticateToken, roomController.joinRoom);

module.exports = router;
