const express = require('express');
const upload = require('../middleware/multer');
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API endpoints for managing user profiles
 */

/**
 * @swagger
 * /profile/picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/picture', upload.single('profilePicture'), authenticateToken,
  profileController.uploadProfilePicture);

/**
 * @swagger
 * /profile/bio:
 *   post:
 *     summary: Update user bio
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 maxlength: 500
 *     responses:
 *       200:
 *         description: Bio updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/bio', authenticateToken, profileController.updateBio);

module.exports = router;
