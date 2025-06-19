// routes/cartRoutes.js
import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  convertToGreenCart
} from '../controllers/cartController.js';

import verifyAuth from '../middleware/auth0Middleware.js';
import Coupon from '../models/Coupon.js';
import User from '../models/User.js';

const router = express.Router();

// All cart routes are protected
router.use(verifyAuth);

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post('/items', addToCart);

// Update item quantity
router.put('/items/:productId', updateCartItem);

// Remove item from cart
router.delete('/items/:productId', removeFromCart);

// Clear cart
router.delete('/', clearCart);

// Convert entire cart to eco-friendly alternatives
router.post('/convert-to-green', convertToGreenCart);

// Apply coupon code
router.post('/coupon', async (req, res) => {
  const { code } = req.body;
  const userId = req.user.sub;

  if (!code) {
    return res.status(400).json({ message: 'Coupon code is required' });
  }

  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    if (new Date() > coupon.expiresAt) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    const user = await User.findOne({ auth0Id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if ((user.ecoStats?.co2Saved || 0) < coupon.requiredCo2Saved) {
      return res.status(400).json({
        message: `You need to save at least ${coupon.requiredCo2Saved} kg of CO₂ to use this coupon.`,
      });
    }

    // Simulate discount application
    return res.json({
      message: `Coupon applied: ${coupon.discountPercent}% discount unlocked!`,
      discount: coupon.discountPercent,
    });

  } catch (error) {
    console.error('[Coupon Error]', error);
    return res.status(500).json({ message: 'Failed to apply coupon' });
  }
});

export default router;
