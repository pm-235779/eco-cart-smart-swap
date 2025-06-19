const AnalyticsEvent = require('../models/AnalyticsEvent');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const User = require('../models/User');

// 📌 Track user actions
exports.trackAction = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    const event = new AnalyticsEvent({
      user: user._id,
      action: req.body.action,
      data: req.body.data || {},
    });
    await event.save();
    res.status(201).json({ message: 'Action tracked' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to track', error: err.message });
  }
};

// 📊 User analytics (eco impact dashboard)
exports.getUserAnalytics = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    const purchases = await Purchase.find({ user: user._id });

    const co2Saved = purchases.reduce((sum, p) => sum + (p.co2Saved || 0), 0);
    const ecoScore = purchases.reduce((sum, p) => sum + (p.ecoScore || 0), 0);
    const totalSpent = purchases.reduce((sum, p) => sum + (p.totalAmount || 0), 0);

    const monthlyData = Array(12).fill(0);
    purchases.forEach((p) => {
      const month = new Date(p.createdAt).getMonth();
      monthlyData[month] += p.co2Saved || 0;
    });

    res.json({
      totalPurchases: purchases.length,
      totalSpent,
      co2Saved,
      ecoScore,
      monthlyData,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user analytics', error: err.message });
  }
};

// 🧠 Admin dashboard analytics
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPurchases = await Purchase.countDocuments();
    const totalRevenue = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const topProducts = await Product.find().sort({ ecoScore: -1 }).limit(5);

    res.json({
      totalUsers,
      totalPurchases,
      totalRevenue: totalRevenue[0]?.total || 0,
      topEcoProducts: topProducts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Dashboard failed', error: err.message });
  }
};

// 📦 Product analytics
exports.getProductAnalytics = async (req, res) => {
  try {
    const productId = req.params.id;
    const events = await AnalyticsEvent.find({ 'data.productId': productId });

    const views = events.filter((e) => e.action === 'view_product').length;
    const greenSwaps = events.filter((e) => e.action === 'green_swap' && e.data.productId === productId).length;
    const purchases = await Purchase.find({ 'items.product': productId });

    const revenue = purchases.reduce((sum, p) => {
      const item = p.items.find((i) => i.product.toString() === productId);
      return item ? sum + item.quantity * (item.price || 0) : sum;
    }, 0);

    const monthlyData = Array(12).fill(0);
    purchases.forEach((p) => {
      const month = new Date(p.createdAt).getMonth();
      const item = p.items.find((i) => i.product.toString() === productId);
      if (item) monthlyData[month] += item.quantity;
    });

    res.json({ views, purchases: purchases.length, revenue, conversionRate: purchases.length / (views || 1), monthlyData });
  } catch (err) {
    res.status(500).json({ message: 'Product analytics error', error: err.message });
  }
};
