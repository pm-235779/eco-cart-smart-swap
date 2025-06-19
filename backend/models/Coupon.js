import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: { type: Number, required: true }, // e.g., 10 for 10%
  requiredCo2Saved: { type: Number, required: true }, // e.g., 5 means user must have saved 5 kg CO2
  expiresAt: { type: Date, required: true },
});

export default mongoose.model('Coupon', couponSchema);
