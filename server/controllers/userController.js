// Example userController.js
const User = require("../models/User"); // Assuming you have a User model

const getUser = async (userId) => {
    const userProfile = await User.findById(userId);
    if (!userProfile) {
        throw new Error("User not found");
    }
    return userProfile;
};

// Added getAllUsers function
const getAllUsers = async () => {
    return await User.find({});
};

module.exports = { getUser, getAllUsers };
