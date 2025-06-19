import User from '../models/User.js';

// Sync or create user after Auth0 login
export const syncAuth0User = async (req, res) => {
  const { auth0Id, email, name, picture } = req.body;

  try {
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ auth0Id, email, name, picture });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error syncing user', error: err.message });
  }
};

// Get logged-in user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

// Update name or preferences
export const updateProfile = async (req, res) => {
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { auth0Id: req.user.sub },
      { $set: updates },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

// Update eco stats
export const updateEcoStats = async (req, res) => {
  const stats = req.body;

  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    if (!user) return res.status(404).json({ message: 'User not found' });

    for (const key in stats) {
      user.ecoStats[key] = (user.ecoStats[key] || 0) + stats[key];
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update eco stats', error: err.message });
  }
};

// Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ 'ecoStats.co2Saved': -1 })
      .limit(10)
      .select('name picture ecoStats');
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: err.message });
  }
};

// Delete account
export const deleteAccount = async (req, res) => {
  try {
    await User.findOneAndDelete({ auth0Id: req.user.sub });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting account', error: err.message });
  }
};
