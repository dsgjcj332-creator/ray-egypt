
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('RAY API Server is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
