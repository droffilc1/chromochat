const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL to the profile picture
  },
  bio: {
    type: String,
    maxlength: 500, // Limit bio length
  },
});

module.exports = mongoose.model('User', userSchema);
