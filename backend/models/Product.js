import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    image: String,
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // percent
    isEcoFriendly: { type: Boolean, default: false },
    ecoScore: { type: Number, min: 0, max: 10, default: 0 },
    tags: [String],
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
