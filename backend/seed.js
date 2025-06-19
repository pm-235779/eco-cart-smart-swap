// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eco-cart';

const seedProducts = [
  {
    name: 'Plastic Water Bottle',
    category: 'Drinkware',
    isEcoFriendly: false,
    ecoScore: 2.1,
    price: 80,
    discount: 0,
    tags: ['plastic', 'reusable'],
  },
  {
    name: 'Stainless Steel Water Bottle',
    category: 'Drinkware',
    isEcoFriendly: true,
    ecoScore: 9.4,
    price: 150,
    discount: 10,
    tags: ['steel', 'reusable', 'eco'],
  },
  {
    name: 'Disposable Paper Plate',
    category: 'Tableware',
    isEcoFriendly: false,
    ecoScore: 3.0,
    price: 60,
    discount: 5,
    tags: ['paper', 'single-use'],
  },
  {
    name: 'Areca Palm Leaf Plate',
    category: 'Tableware',
    isEcoFriendly: true,
    ecoScore: 8.7,
    price: 90,
    discount: 10,
    tags: ['leaf', 'biodegradable'],
  },
  {
    name: 'Cotton Shopping Bag',
    category: 'Bags',
    isEcoFriendly: true,
    ecoScore: 9.1,
    price: 50,
    discount: 0,
    tags: ['cotton', 'reusable'],
  },
];

const seedUsers = [
  {
    auth0Id: 'auth0|seeduser1',
    name: 'Eco Warrior',
    email: 'eco@example.com',
    picture: '',
    role: 'user',
    ecoStats: {
      totalCO2Saved: 12.5,
      totalPurchases: 4,
      ecoPurchases: 3,
      ecoScore: 8.4,
    },
    preferences: {
      autoSwap: true,
    },
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected...');

    await Product.deleteMany({});
    await User.deleteMany({});

    await Product.insertMany(seedProducts);
    await User.insertMany(seedUsers);

    console.log('🌱 Seed data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
