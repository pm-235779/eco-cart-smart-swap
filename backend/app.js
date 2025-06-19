const cartRoutes = require('./routes/cartRoutes');

app.use('/api/cart', cartRoutes);

const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

const purchaseRoutes = require('./routes/purchaseRoutes');

app.use('/api/purchases', purchaseRoutes);

const analyticsRoutes = require('./routes/analyticsRoutes');

app.use('/api/analytics', analyticsRoutes);
