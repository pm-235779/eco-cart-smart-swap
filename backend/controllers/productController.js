import Product from '../models/Product.js';

// GET /products
export const getProducts = async (req, res) => {
  try {
    const query = {};

    if (req.query.category) query.category = req.query.category;
    if (req.query.isEcoFriendly)
      query.isEcoFriendly = req.query.isEcoFriendly === 'true';
    if (req.query.minEcoScore)
      query.ecoScore = { $gte: Number(req.query.minEcoScore) };
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

    return res.json({ products, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

// GET /products/:id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });

    return res.json(product);
  } catch {
    return res.status(500).json({ message: 'Error getting product' });
  }
};

// POST /products
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch {
    return res.status(500).json({ message: 'Create failed' });
  }
};

// PUT /products/:id
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch {
    return res.status(500).json({ message: 'Update failed' });
  }
};

// DELETE /products/:id
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Deleted' });
  } catch {
    return res.status(500).json({ message: 'Delete failed' });
  }
};

// GET /products/:id/eco-alternatives
export const getEcoAlternatives = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alternatives = await Product.find({
      category: product.category,
      isEcoFriendly: true,
      ecoScore: { $gt: product.ecoScore },
    })
      .sort({ ecoScore: -1 })
      .limit(5);

    return res.json(alternatives);
  } catch {
    return res.status(500).json({ message: 'Error finding alternatives' });
  }
};

// GET /products/trending
export const getTrendingProducts = async (req, res) => {
  try {
    const trending = await Product.find().sort({ ecoScore: -1 }).limit(10);
    return res.json(trending);
  } catch {
    return res.status(500).json({ message: 'Error fetching trending' });
  }
};
