const express = require("express");
const router = express.Router();
const { getUser, getAllUsers } = require("../controllers/userController"); // Import getAllUsers here

// Route to get a user profile by userId
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const userProfile = await getUser(userId);
        res.json(userProfile);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to get all users
router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
