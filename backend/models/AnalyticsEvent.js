import mongoose from 'mongoose';
const AnalyticsEventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true }, // e.g., 'view', 'add_to_cart'
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    metadata: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model('AnalyticsEvent', AnalyticsEventSchema);