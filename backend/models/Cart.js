import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true }, // Storing Auth0 `sub`
  items: [cartItemSchema],
}, {
  timestamps: true,
});

export default mongoose.model('Cart', cartSchema);
