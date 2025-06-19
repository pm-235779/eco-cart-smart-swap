// const mongoose = require('mongoose');

// const EcoStatsSchema = new mongoose.Schema({
//   co2Saved: { type: Number, default: 0 },
//   ecoScore: { type: Number, default: 0 },
//   greenPurchases: { type: Number, default: 0 },
// });

// const UserPreferencesSchema = new mongoose.Schema({
//   autoSwapToGreen: { type: Boolean, default: false },
// });

// const UserSchema = new mongoose.Schema(
//   {
//     auth0Id: { type: String, required: true, unique: true },
//     email: { type: String, required: true },
//     name: { type: String, required: true },
//     picture: { type: String },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
//     preferences: UserPreferencesSchema,
//     ecoStats: EcoStatsSchema,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('User', UserSchema);

import mongoose from 'mongoose';

const UserPreferencesSchema = new mongoose.Schema({
  autoSwapToGreen: { type: Boolean, default: false },
  newsletterSubscribed: { type: Boolean, default: false },
});

const EcoStatsSchema = new mongoose.Schema({
  co2Saved: { type: Number, default: 0 },
  totalEcoSwaps: { type: Number, default: 0 },
  monthlyStats: {
    type: [
      {
        month: String, // "2025-06"
        co2Saved: Number,
        ecoSwaps: Number,
      },
    ],
    default: [],
  },
});

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  picture: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },

  preferences: {
    autoSwapToGreen: { type: Boolean, default: false },
  },

  ecoStats: {
    co2Saved: { type: Number, default: 0 },
    ecoScore: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    totalPurchases: { type: Number, default: 0 },
  },

  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('User', userSchema);

