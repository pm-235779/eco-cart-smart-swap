// controllers/cartController.js
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { getUserIdFromToken } from '../utils/authHelpers.js';

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = getUserIdFromToken(req);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = getUserIdFromToken(req);

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      await cart.populate('items.product');
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating cart item' });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = getUserIdFromToken(req);

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true }
    ).populate('items.product');

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error clearing cart' });
  }
};

// Convert to green cart
export const convertToGreenCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    for (let item of cart.items) {
      const ecoAlternatives = await Product.find({
        category: item.product.category,
        isEcoFriendly: true,
        ecoScore: { $gt: item.product.ecoScore }
      }).sort({ ecoScore: -1 });

      if (ecoAlternatives.length > 0) {
        item.product = ecoAlternatives[0]._id;
      }
    }

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error converting to green cart' });
  }
};

// Placeholder for coupon endpoint
export const applyCoupon = async (req, res) => {
  try {
    res.json({ message: 'Coupon applied successfully (placeholder)' });
  } catch (err) {
    res.status(500).json({ message: 'Coupon application failed' });
  }
};
