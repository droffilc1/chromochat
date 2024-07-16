const express = require('express');
const upload = require('../middleware/multer'); // Import the multer configuration
const User = require('../models/User');
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
 */
router.post('/picture', upload.single('profilePicture'), async (req, res) => {
  const userId = req.user.id;
  const profilePicture = req.file.path; // URL of the uploaded file on Cloudinary

  try {
    await User.findByIdAndUpdate(userId, { profilePicture });
    res.status(200).json({ message: 'Profile picture uploaded successfully', profilePicture });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /profile/bio:
 *   post:
 *     summary: Update user bio
 *     tags: [Profile]
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
 */
router.post('/bio', async (req, res) => {
  const userId = req.user.id;
  const { bio } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { bio });
    res.status(200).json({ message: 'Bio updated successfully', bio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
