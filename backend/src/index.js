import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3002',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.get('/api/products', (req, res) => {
  res.json({ success: true, data: [], total: 0 });
});

app.get('/api/jobs', (req, res) => {
  res.json({ success: true, data: [], count: 0 });
});

app.get('/api/merchants', (req, res) => {
  res.json({ success: true, data: [], count: 0 });
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: [], count: 0 });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
