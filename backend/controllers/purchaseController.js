import Purchase from '../models/Purchase.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

export const createPurchase = async (req, res) => {
  const auth0Id = req.user.sub;
  const { shippingAddress, cartItems } = req.body;

  try {
    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let totalAmount = 0;
    let totalEcoScore = 0;
    let co2Saved = 0;

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      totalAmount += product.price * item.quantity;
      totalEcoScore += product.ecoScore * item.quantity;

      if (product.isEcoFriendly) {
        co2Saved += item.quantity * 2.5; // example value
      }
    }

    const purchase = new Purchase({
      user: user._id,
      items: cartItems.map((i) => ({ product: i.productId, quantity: i.quantity })),
      totalAmount,
      co2Saved,
      ecoScore: totalEcoScore,
      shippingAddress,
    });

    await purchase.save();

    // Update eco stats
    user.ecoStats.co2Saved += co2Saved;
    user.ecoStats.ecoScore += totalEcoScore;
    user.ecoStats.totalSpent += totalAmount;
    user.ecoStats.totalPurchases += 1;
    await user.save();

    res.status(201).json(purchase);
  } catch (err) {
    res.status(500).json({ message: 'Purchase failed', error: err.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    const purchases = await Purchase.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate('items.product');

    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch purchases', error: err.message });
  }
};

export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate('items.product');
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    res.json(purchase);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

export const cancelPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (purchase.status !== 'processing') {
      return res.status(400).json({ message: 'Cannot cancel after shipment' });
    }

    purchase.status = 'cancelled';
    await purchase.save();
    res.json({ message: 'Cancelled', purchase });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

export const updateShipping = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (purchase.status !== 'processing') {
      return res.status(400).json({ message: 'Shipping address can no longer be updated' });
    }

    purchase.shippingAddress = req.body;
    await purchase.save();
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};
