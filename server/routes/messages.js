const express = require('express');
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - roomId
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
 * '/messages/send':
 *   post:
 *     summary: Send a message to a chat room
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden
 */
router.post('/send', authenticateToken, messageController.sendMessage);

/**
 * @swagger
 * /messages/{roomId}:
 *   get:
 *     summary: Retrieve messages from a chat room
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/:roomId', authenticateToken, messageController.getMessages);

/**
 * @swagger
 * /messages/users/{roomId}:
 *   get:
 *     summary: Retrieve bios of users in a chat room
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */
router.get('/users/:roomId', authenticateToken, messageController.getUserBio);

module.exports = router;
