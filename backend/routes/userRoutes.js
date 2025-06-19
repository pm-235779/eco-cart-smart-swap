// routes/users.js
import express from 'express';
import checkJwt from '../middleware/auth0Middleware.js';
import checkAdmin from '../middleware/checkAdmin.js';
import {
  syncAuth0User,
  getProfile,
  updateProfile,
  updateEcoStats,
  getLeaderboard,
  deleteAccount,
} from '../controllers/userController.js';

const router = express.Router();

// ✅ Create or get user after Auth0 login
router.post('/auth0-sync', syncAuth0User);

// ✅ Authenticated user routes (requires valid Auth0 JWT)
router.get('/profile', checkJwt, getProfile);
router.put('/profile', checkJwt, updateProfile);
router.put('/eco-stats', checkJwt, updateEcoStats);
router.delete('/profile', checkJwt, deleteAccount);

// ✅ Public route - no auth needed
router.get('/leaderboard', getLeaderboard);

// ✅ Optional admin-only route example
router.get('/admin-area', checkJwt, checkAdmin, (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

export default router;
