// server.js or index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';


// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors());         // Enable CORS
app.use(helmet());       // Add security headers
app.use(morgan('dev'));  // Logging (optional but useful)

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/analytics', analyticsRoutes);


// Health check route
app.get('/', (req, res) => {
  res.send('🌿 Smart Eco-Friendly Recommender API is live!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
