import express from 'express';
import Purchase from '../models/Purchase.js';
import Coupon from '../models/Coupon.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import  verifyAuth from '../middleware/auth0Middleware.js';
import {
  getPurchases,
  getPurchaseById,
  cancelPurchase,
  updateShipping
} from '../controllers/purchaseController.js';

const router = express.Router();

// Place a new order
router.post('/', verifyAuth, async (req, res) => {
  const userId = req.user.sub;
  const { shippingAddress, couponCode } = req.body;

  try {
    const user = await User.findOne({ auth0Id: userId });
    const cart = await Cart.findOne({ user: user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalBeforeDiscount = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    let discountPercent = 0;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        return res.status(404).json({ message: 'Invalid coupon code' });
      }

      if (new Date() > coupon.expiresAt) {
        return res.status(400).json({ message: 'Coupon expired' });
      }

      if ((user.ecoStats?.co2Saved || 0) < coupon.requiredCo2Saved) {
        return res.status(400).json({
          message: `You need to save ${coupon.requiredCo2Saved} kg CO₂ to use this coupon.`,
        });
      }

      discountPercent = coupon.discountPercent;
    }

    const totalAfterDiscount = totalBeforeDiscount * (1 - discountPercent / 100);

    const purchase = new Purchase({
      userId: user._id,
      items: cart.items,
      shippingAddress,
      totalBeforeDiscount,
      totalAfterDiscount,
      couponCode: couponCode || undefined,
      discountPercent,
    });

    await purchase.save();
    cart.items = [];
    await cart.save();

    return res.json(purchase);
  } catch (err) {
    console.error('[Purchase]', err);
    return res.status(500).json({ message: 'Failed to complete purchase' });
  }
});

// Get all purchases for logged-in user
router.get('/', verifyAuth, getPurchases);

// Get a specific purchase by ID
router.get('/:id', verifyAuth, getPurchaseById);

// Cancel a purchase
router.put('/:id/cancel', verifyAuth, cancelPurchase);

// Update shipping status
router.put('/:id/shipping', verifyAuth, updateShipping);

export default router;
