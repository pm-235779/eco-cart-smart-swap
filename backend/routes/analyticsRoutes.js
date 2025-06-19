// routes/analyticsRoutes.js
import express from 'express';
import verifyAuth from '../middleware/auth0Middleware.js';
import checkAdmin from '../middleware/checkAdmin.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Purchase from '../models/Purchase.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

const router = express.Router();

// 1. Admin Dashboard Analytics
router.get('/dashboard', verifyAuth, checkAdmin, async (req, res) => {
  try {
    const totalPurchases = await Purchase.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalEcoSaved = await User.aggregate([
      { $group: { _id: null, totalCO2: { $sum: '$ecoStats.co2Saved' } } },
    ]);

    const categoryStats = await Product.aggregate([
      { $match: { isEcoFriendly: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalPurchases,
        totalUsers,
        totalProducts,
        totalCO2Saved: totalEcoSaved[0]?.totalCO2 || 0,
        ecoCategoriesSold: categoryStats,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Dashboard analytics failed' });
  }
});

// 2. Get user analytics
router.get('/user', verifyAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      success: true,
      data: {
        totalPurchases: user.purchaseHistory.length,
        totalSpent: user.purchaseHistory.reduce((acc, p) => acc + (p.total || 0), 0),
        co2Saved: user.ecoStats.co2Saved || 0,
        ecoScore: user.ecoStats.ecoScore || 0,
        monthlyData: user.ecoStats.monthlyData || [],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'User analytics failed' });
  }
});

// 3. Get product analytics
router.get('/products/:id', verifyAuth, checkAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const purchases = await Purchase.find({ 'items.product': productId });

    const views = await AnalyticsEvent.countDocuments({ type: 'view', productId });
    const revenue = purchases.reduce((acc, p) => {
      const item = p.items.find((i) => i.product.toString() === productId);
      return acc + (item?.price || 0) * (item?.quantity || 1);
    }, 0);
    const totalPurchased = purchases.reduce((acc, p) => {
      const item = p.items.find((i) => i.product.toString() === productId);
      return acc + (item?.quantity || 0);
    }, 0);

    const conversionRate = views === 0 ? 0 : (totalPurchased / views) * 100;

    res.json({
      success: true,
      data: {
        views,
        purchases: totalPurchased,
        revenue,
        conversionRate: Number(conversionRate.toFixed(2)),
        monthlyData: [],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Product analytics failed' });
  }
});

// 4. Track frontend user action
router.post('/track', verifyAuth, async (req, res) => {
  try {
    const { action, data } = req.body;

    const event = new AnalyticsEvent({
      user: req.user.id,
      type: action,
      productId: data?.productId || null,
      metadata: data || {},
    });
    await event.save();

    res.json({ success: true, message: 'Event tracked' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Event tracking failed' });
  }
});

export default router;
