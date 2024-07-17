const User = require('../models/User');

exports.updateBio = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio } = req.body;

    const user = await User.findByIdAndUpdate(userId, { bio }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const profilePicture = req.file.path;

    const user = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
